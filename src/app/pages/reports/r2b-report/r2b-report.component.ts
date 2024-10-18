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
  selector: 'app-r2b-report',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './r2b-report.component.html',
  styleUrl: './r2b-report.component.scss'
})
export class R2bReportComponent {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;

  ngOnInit(): void {

    this.r2bList();
  }
  lists: listType[] = [];

  r2bList() {
    this.restApi.r2bReportApi().subscribe((res: any) => {
      if (res.status) {
        this.lists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
