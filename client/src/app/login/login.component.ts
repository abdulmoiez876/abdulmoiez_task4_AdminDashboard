import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  message: string = '';
  messageStatus: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('isAuthenticated', 'false');
    console.log(localStorage.getItem('isAuthenticated'));
    
  }

  verifyFromDatabase() {
    this.http.post<{userAuthenticated: boolean}>("http://localhost:8000/authenticateUser", {
      email: this.email,
      password: this.password
    }).subscribe(data => {
      if(data.userAuthenticated) {
        console.log(localStorage.getItem('isAuthenticated'));
        localStorage.setItem('isAuthenticated', 'true');
        console.log(localStorage.getItem('isAuthenticated'));

        this.message = '';
        this.email = '';
        this.password = '';
        this.router.navigate(['/adminPanel'])
      }
      else {
        this.messageStatus = false;
        this.message = 'Invalid Login, Please try again!';
      }
    });
  }

  addToDatabase() {
    this.http.post<{userCreated: boolean}>('http://localhost:8000/addUser', {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      if(response.userCreated) {
        this.messageStatus = true;
        this.message = "User created successfully!";
      }
      else {
        this.messageStatus = false;
        this.message = "User creation failed!";
      }
    })
  }
}