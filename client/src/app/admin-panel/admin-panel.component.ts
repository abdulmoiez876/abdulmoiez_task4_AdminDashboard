import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private route: Router) { 
  }
  
  ngOnInit(): void {
    if((localStorage.getItem('isAuthenticated')) == 'false') {
      this.route.navigate(['login']);
    }
  }

}
