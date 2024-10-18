import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestApiService } from '../../../services/api/rest-api.service';
import { NotifyService } from '../../../services/noty/notify.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{


    constructor(private restApi:RestApiService,private noty:NotifyService){

    }

    ngOnInit(): void {
      this.totalRoportCount();
    }
counts:any;
    totalRoportCount(){
      this.restApi.reportCountApi().subscribe((res:any)=>{
        if(res.status){
          this.counts = res.data;
        }else{
          this.noty.error(res.message);
        }
      })
    }


}
