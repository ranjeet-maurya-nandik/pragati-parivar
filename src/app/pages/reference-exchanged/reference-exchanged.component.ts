import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

interface referenceExchange {
  date: string,
  references: [{
    id: number,
    date: string,
    reference_given_by: string,
    reference_received_by: string,
    ref_date: string,
  }]
}

@Component({
  selector: 'app-reference-exchanged',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule],
  templateUrl: './reference-exchanged.component.html',
  styleUrl: './reference-exchanged.component.scss'
})
export class ReferenceExchangedComponent implements OnInit {
  p:number = 0;
  currentDate = new Date();
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  ngOnInit(): void {
    const yesterdayDate = new Date(this.currentDate);
    yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.today = yesterdayDate.toISOString().split('T');
    
    this.referenceList('');
  }
  referenceLists: referenceExchange[] = [];
  today:any;
  referenceList(date: any) {

    const selectedDate = new Date(date.value);
    

    if (selectedDate > this.currentDate) {
      this.noty.error('Future dates are not allowed.');
      return;
    }

    const data = {
      date: date.value ?? this.today[0]
    }

    this.restApi.referenceExchangedApi(data).subscribe((res: any) => {
      if (res.status) {
        this.referenceLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
