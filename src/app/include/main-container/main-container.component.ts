import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { BarsBtnService } from '../../services/bars/bars-btn.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,RouterOutlet,CommonModule],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent implements OnInit,OnDestroy{

  isAnotherComponentActive: boolean = false;
  private subscription: Subscription;

  constructor(private sharedDataService: BarsBtnService, private  storage:StorageService, private router:Router) {
    this.subscription = this.sharedDataService.isAnotherComponentActive$.subscribe(isActive =>{
      this.onResize();
      this.isAnotherComponentActive = isActive;
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any = '') {
    this.isAnotherComponentActive = window.innerWidth < 1024;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loggedIn();
  }
  
  loggedIn(){
    const token = this.storage.get('token');
    if(!token){
      this.router.navigate(['/login']);
    }
  }

}
