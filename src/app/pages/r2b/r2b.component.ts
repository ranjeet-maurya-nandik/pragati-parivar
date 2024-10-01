import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';

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
  imports: [NgxPaginationModule],
  templateUrl: './r2b.component.html',
  styleUrl: './r2b.component.scss'
})
export class R2bComponent implements OnInit {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;
  ngOnInit(): void {
    this.r2bList();
  }
  r2bLists:R2B[] = [];
  r2bList() {
    this.restApi.r2bApi().subscribe((res: any) => {
      if (res.status) {
        this.r2bLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }

}
