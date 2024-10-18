import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

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
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './business-reporting.component.html',
  styleUrl: './business-reporting.component.scss'
})
export class BusinessReportingComponent implements OnInit {
  p: number = 0;
  currentDate = new Date();

  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  ngOnInit(): void {
    const yesterdayDate = new Date(this.currentDate);
    yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.today = yesterdayDate.toISOString().split('T');
    

    this.BusinessReportList('');
  }
  businessReportLists: BusinessReport[] = [];
  today: any;
  BusinessReportList(date: any) {

    const selectedDate = new Date(date.value);

    if (selectedDate > this.currentDate) {
      this.noty.error('Future dates are not allowed.');
      return;
    }

    const data = {
      date: date.value ?? this.today[0]
    }

    this.restApi.businessReportingApi(data).subscribe((res: any) => {
      if (res.status) {
        this.businessReportLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }

}
