import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{

  routes:string= '';
  constructor(private route:Router){
  }
  ngOnInit(): void {
    this.route.events.subscribe(()=>{
      let urlWithoutParams = this.route.url.split('?')[0];
      urlWithoutParams = urlWithoutParams.split(';')[0];
      this.routes = urlWithoutParams;
      console.log(this.routes);
    })    
  }
}
