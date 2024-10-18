import { Component} from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

interface listType {
  user_id:number,
  name:string,
  given:number,
  recieved:number,
  total:number
}
@Component({
  selector: 'app-reference-report',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './reference-report.component.html',
  styleUrl: './reference-report.component.scss'
})
export class ReferenceReportComponent {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;

  ngOnInit(): void {

    this.referenceList();
  }
  lists: listType[] = [];

  referenceList() {
    this.restApi.referenceReportApi().subscribe((res: any) => {
      if (res.status) {
        this.lists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
