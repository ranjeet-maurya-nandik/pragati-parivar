import { Component } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../services/noty/notify.service';

@Component({
  selector: 'app-r2b-details',
  standalone: true,
  imports: [],
  templateUrl: './r2b-details.component.html',
  styleUrl: './r2b-details.component.scss'
})
export class R2bDetailsComponent {
  constructor(private restApi: RestApiService, private router: ActivatedRoute, private noty: NotifyService) {

  }

  userId: number = 0;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      if (params) {
        this.userId = params['id'];
      }
    });
    if (this.userId) {
      this.b_reportDetails();
    }
  }

  data:any;
  b_reportDetails() {
    this.restApi.r2bDetailsApi(this.userId).subscribe((res: any) => {
      if (res.status) {
        this.data = res.data;
      } else {
        this.noty.error(res.message);
      }
    })
  }
}
