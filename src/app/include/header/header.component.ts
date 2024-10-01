import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BarsBtnService } from '../../services/bars/bars-btn.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private barsBtnService:BarsBtnService, private storage:StorageService,private router:Router){}
  userDetails:any;
  ngOnInit(): void {
    const user = this.storage.get('user_details');
    if(user){
      this.userDetails = JSON.parse(user);
    }
  }
  logOut(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }
  onButtonClick() {
    this.barsBtnService.toggleAnotherComponent(); 
  }
}
