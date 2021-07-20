import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
menuButton:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  openMobileNav(e:any){
   
    document.getElementById("mobile-nav").style.display="flex"
    document.getElementById("mobile-container").style.display="none"
  }
  closeMobileNav(){
  document.getElementById("mobile-nav").style.display="none"
  document.getElementById("mobile-container").style.display="block"
}
}
