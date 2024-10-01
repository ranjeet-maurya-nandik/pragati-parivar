import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';

interface BusinessReport {
  date: string,
  reports: [{
    id: number,
    email: string,
    date_of_business_exchange: string,
    giver_id: number,
    giver_name: string,
    receiver_id: number,
    receiver_name: string,
    type_of_transaction_id: number,
    type_of_transaction_name: string,
    product_services: string,
    amount: number
  }]
}
@Component({
  selector: 'app-business-reporting',
  standalone: true,
  imports: [],
  templateUrl: './business-reporting.component.html',
  styleUrl: './business-reporting.component.scss'
})
export class BusinessReportingComponent implements OnInit {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  ngOnInit(): void {
    this.BusinessReportList();
  }
  businessReportLists: BusinessReport[] = [];
  BusinessReportList() {
    this.restApi.businessReportingApi().subscribe((res: any) => {
      if (res.status) {
        this.businessReportLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }

}
