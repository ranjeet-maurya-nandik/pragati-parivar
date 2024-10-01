import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../../../services/noty/notify.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit{

  constructor(private restApi:RestApiService,private router:ActivatedRoute,private noty:NotifyService){

  }

  userId:number = 0 ;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params:any)=>{
        if(params){
          this.userId = params['id'];
        }
    });
    if(this.userId){
      this.userDetails();
    }
  }

  profile_data:any;
  userDetails(){
    this.restApi.userDetailsApi(this.userId).subscribe((res:any)=>{
      if(res.status){
        this.profile_data = res.user_details;
      }else{
        this.noty.error(res.message);
      }
    })
  }
}
