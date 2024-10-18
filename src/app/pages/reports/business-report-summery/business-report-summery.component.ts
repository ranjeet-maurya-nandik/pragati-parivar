import { Component } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface listType {
  id: string,
  given_by: string,
  recieved_by: string,
  date_of_exchange: string,
  product_services: string,
  amount: string,
  transaction_type: number
}
@Component({
  selector: 'app-business-report-summery',
  standalone: true,
  imports: [NgxPaginationModule, RouterLink],
  templateUrl: './business-report-summery.component.html',
  styleUrl: './business-report-summery.component.scss'
})
export class BusinessReportSummeryComponent {
  constructor(private restApi: RestApiService, private noty: NotifyService, private router: ActivatedRoute) { }
  p: number = 1;

  data = {
    type: 0,
    user_id: 0
  }
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      if (params) {
        this.data.user_id = params['id'];
        this.data.type = params['type'];
      }
    });
    if (this.data.user_id) {
      this.businessSummeryList();
    }
  }
  lists: listType[] = [];

  businessSummeryList() {
    this.restApi.businessReportSummeryApi(this.data).subscribe((res: any) => {
      if (res.status) {
        this.lists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
