import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

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
  imports: [RouterLink,NgxPaginationModule,CommonModule],
  templateUrl: './give-ask.component.html',
  styleUrl: './give-ask.component.scss'
})
export class GiveAskComponent implements OnInit{
  p:number = 0;
  today!: string[];

   currentDate = new Date();  
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  ngOnInit(): void {
    const yesterdayDate = new Date(this.currentDate);
    yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.today = yesterdayDate.toISOString().split('T');
    
    this.giveAskList('');
  }

  giveAskLists: giveAsk[] = [];

  giveAskList(date:any) {
    const selectedDate = new Date(date.value); 
    if (selectedDate > this.currentDate) {
      this.noty.error('Future dates are not allowed.');
      return;
    }

    const data = {
      date:date.value ?? this.today[0]
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
