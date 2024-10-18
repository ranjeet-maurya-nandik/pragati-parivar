import { Component} from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

interface listType {
  user_id:number,
  name:string,
  bs_given:number,
  bsn_recieved:number,
  total:number
}
@Component({
  selector: 'app-business-report',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule],
  templateUrl: './business-report.component.html',
  styleUrl: './business-report.component.scss'
})
export class BusinessReportComponent {
  constructor(private restApi: RestApiService, private noty: NotifyService) { }
  p: number = 1;

  ngOnInit(): void {
    this.businessList();
  }
  lists: listType[] = [];

  businessList() {
    this.restApi.businessReportApi().subscribe((res: any) => {
      if (res.status) {
        this.lists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
