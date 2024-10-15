import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
interface wingType{
  id:number,
  meeting_date:string,
  meeting_time:string,
  wing_name:string,

}
@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.scss'
})
export class MeetingListComponent {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;
  ngOnInit(): void {
    this.meetingList();
  }
  meetingLists: wingType[] = [];
  meetingList() {
    this.restApi.meetingListApi().subscribe((res: any) => {
      if (res.status) {
        this.meetingLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }

  deleteMeeting(id: number) {
    Swal.fire({
      text: 'Are you sure want to delete this meeting?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.restApi.deleteMeetingApi(id).subscribe((res: any) => {
          if (res.status) {
            this.meetingList();
            this.noty.success(res.message)
          } else {
            this.noty.error(res.message)
          }
        })
      }
    })

  }
}
