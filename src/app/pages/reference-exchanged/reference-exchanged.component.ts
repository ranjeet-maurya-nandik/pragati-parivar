import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/api/rest-api.service';
import { NotifyService } from '../../services/noty/notify.service';

interface referenceExchange {
  date: string,
  references: [{
    id: number,
    date: string,
    reference_given_by: string,
    reference_received_by: string,
    for_what: string
  }]
}

@Component({
  selector: 'app-reference-exchanged',
  standalone: true,
  imports: [],
  templateUrl: './reference-exchanged.component.html',
  styleUrl: './reference-exchanged.component.scss'
})
export class ReferenceExchangedComponent implements OnInit{
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  ngOnInit(): void {
    this.referenceList();
  }
  referenceLists: referenceExchange[] = [];
  referenceList() {
    this.restApi.referenceExchangedApi().subscribe((res: any) => {
      if (res.status) {
        this.referenceLists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
