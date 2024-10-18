import { Component } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface listType {
  id: string,
  r2b_host: string,
  r2b_guest: string,
  r2b_date: string,
  business_purpose: string,
  gaincd_followed: string,
  discussion: string
}
@Component({
  selector: 'app-r2b-report-summery',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './r2b-report-summery.component.html',
  styleUrl: './r2b-report-summery.component.scss'
})
export class R2bReportSummeryComponent {
  constructor(private restApi: RestApiService, private noty: NotifyService, private router: ActivatedRoute) { }
  p: number = 1;

  data = {
    type: 0,
    user_id: 0
  }
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      if (params) {
        this.data.user_id = params['id'];
        this.data.type = params['type'];
      }
    });
    if (this.data.user_id) {
      this.r2bSummeryList();
    }
  }
  lists: listType[] = [];

  r2bSummeryList() {
    this.restApi.r2bReportSummeryApi(this.data).subscribe((res: any) => {
      if (res.status) {
        this.lists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}

