import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  companies: any;

constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit() {
    this.getCompanies();
    this.setCurrentUser();
  }


  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  getCompanies() {
    this.http.get('https://localhost:44383/api/Companies').subscribe( res => {
      this.companies = res
      console.log(this.companies)
    }, error => console.log("error")
    )
  }
}
