import { Component } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface listType {
  id: string,
  given_by: string,
  recieved_by: string,
  ref_date: string,
  for_what: string,
}
@Component({
  selector: 'app-reference-report-summery',
  standalone: true,
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './reference-report-summery.component.html',
  styleUrl: './reference-report-summery.component.scss'
})
export class ReferenceReportSummeryComponent {
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
      this.referenceSummeryList();
    }
  }
  lists: listType[] = [];

  referenceSummeryList() {
    this.restApi.referenceReportSummeryApi(this.data).subscribe((res: any) => {
      if (res.status) {
        this.lists = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
