import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface R2B {
  date: string,
  sublist: [{
    id: number,
    email: string,
    host_name: string,
    guest_name: string,
    date_of_r2b: string,
    purpose_of_business: string,
    gained_followed: string,
    discussion_held: string
  }]
}

@Component({
  selector: 'app-r2b',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink,FormsModule],
  templateUrl: './r2b.component.html',
  styleUrl: './r2b.component.scss'
})
export class R2bComponent implements OnInit {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;
  
   currentDate = new Date();   
  ngOnInit(): void {
    const yesterdayDate = new Date(this.currentDate);
    yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.today = yesterdayDate.toISOString().split('T');
    
    this.r2bList('');
  }
  r2bLists:R2B[] = [];
  today:any = '';
  r2bList(date:any) {
    const selectedDate = new Date(date.value);

    if (selectedDate > this.currentDate) {
      this.noty.error('Future dates are not allowed.');
      return;
    }

    const data = {
      date:date.value ?? this.today[0]
    }
    
    this.restApi.r2bApi(data).subscribe((res: any) => {
      if (res.status) {
        this.r2bLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }

}
