import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  model: any = {};
  hide = true;

  constructor(public accountService: AccountService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(res => {
      console.log({res});
      this.router.navigateByUrl('/company-admin')
      this.snackbar.open("Login Success");
    }), error => this.snackbar.open("ERROR ", error);
    console.log("log", this.model);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

}
