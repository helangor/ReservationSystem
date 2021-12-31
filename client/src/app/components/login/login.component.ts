import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

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
      this.router.navigateByUrl('/')

    }, error => this.snackbar.open("Väärä käyttäjätunnus tai salasana"))};

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

}
