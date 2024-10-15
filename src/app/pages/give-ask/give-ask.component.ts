import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

interface giveAsk {
  date: string,
  sublist: [{
    id: number,
    email: string,
    name: string,
    company: string,
    your_give: string,
    your_ask: string
  }]
}

@Component({
  selector: 'app-give-ask',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule],
  templateUrl: './give-ask.component.html',
  styleUrl: './give-ask.component.scss'
})
export class GiveAskComponent implements OnInit{
  p:number = 0;
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  ngOnInit(): void {
    this.giveAskList('');
  }
  giveAskLists: giveAsk[] = [];
  today:any;
  giveAskList(date:any) {
    const selectedDate = new Date(date.value);
    const currentDate = new Date();   
    
    this.today = currentDate.toISOString().split('T');
    if (selectedDate > currentDate) {
      this.noty.error('Future dates are not allowed.');
      return;
    }

    const data = {
      date:date.value ?? ''
    }
    
    this.restApi.giveAskApi(data).subscribe((res: any) => {
      if (res.status) {
        this.giveAskLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
