import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  p:number = 0;
constructor(private restApi:RestApiService, private noty:NotifyService) {}

ngOnInit(): void {
  this.dashboard();
}

dashboard_data:any = [];
dashboard(){
  this.restApi.dashboardApi().subscribe((res:any)=>{
    if(res.status){
      this.dashboard_data = res.data;
      console.log(res.data);
    }
  })
}
}
