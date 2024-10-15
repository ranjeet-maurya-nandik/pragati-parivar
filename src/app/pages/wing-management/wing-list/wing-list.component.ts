import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
interface wingType {
  id: number,
  wing_name: string,
  
}

@Component({
  selector: 'app-wing-list',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './wing-list.component.html',
  styleUrl: './wing-list.component.scss'
})
export class WingListComponent {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;
  ngOnInit(): void {
    this.wingList();
  }
  wingLists: wingType[] = [];
  wingList() {
    this.restApi.wingListApi().subscribe((res: any) => {
      if (res.status) {
        this.wingLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }

  deleteWing(id: number) {
    Swal.fire({
      text: 'Are you sure want to delete this wing ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.restApi.deleteWingApi(id).subscribe((res: any) => {
          if (res.status) {
            this.wingList();
            this.noty.success(res.message)
          } else {
            this.noty.error(res.message)
          }
        })
      }
    })

  }
}
