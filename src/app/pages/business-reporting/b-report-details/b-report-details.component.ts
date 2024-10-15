import { Component } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../services/noty/notify.service';

interface Data {
  id:number,
  host_name: string,
  guest_name:string,
  email: string,
  date_of_r2b: string,
  purpose_of_business: string,
  gained_followed: string,
  discussion_held: string
}
@Component({
  selector: 'app-b-report-details',
  standalone: true,
  imports: [],
  templateUrl: './b-report-details.component.html',
  styleUrl: './b-report-details.component.scss'
})
export class BReportDetailsComponent {
  constructor(private restApi: RestApiService, private router: ActivatedRoute, private noty: NotifyService) {

  }

  userId: number = 0;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      if (params) {
        this.userId = params['id'];
      }
    });
    if (this.userId) {
      this.b_reportDetails();
    }
  }

  data:any;
  b_reportDetails() {
    this.restApi.bReportingDetailsApi(this.userId).subscribe((res: any) => {
      if (res.status) {
        this.data = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
