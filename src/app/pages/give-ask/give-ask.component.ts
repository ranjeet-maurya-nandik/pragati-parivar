import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';

interface giveAsk {
  date: string,
  sublist: [{
    id: number,
    created_at: string,
    email: string,
    name: string,
    your_company: string,
    your_give: string,
    your_ask: string
  }]
}

@Component({
  selector: 'app-give-ask',
  standalone: true,
  imports: [],
  templateUrl: './give-ask.component.html',
  styleUrl: './give-ask.component.scss'
})
export class GiveAskComponent implements OnInit{
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  ngOnInit(): void {
    this.giveAskList();
  }
  giveAskLists: giveAsk[] = [];
  giveAskList() {
    this.restApi.giveAskApi().subscribe((res: any) => {
      if (res.status) {
        this.giveAskLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
