import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../users/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../users/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLogin: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userLogin = localStorage.getItem('userLogin') || '';
    console.log(this.userLogin);
  }

  loginForm() {
    let dialogRef = this.dialog.open(LoginComponent, {
      height: '400px',
      width: '400px',
    });
  }

  registerForm() {
    let dialogRef = this.dialog.open(RegisterComponent, {
      height: '400px',
      width: '400px',
    });
  }
  logOut() {
    localStorage.removeItem('userLogin');
    this.userLogin = '';
  }
}
