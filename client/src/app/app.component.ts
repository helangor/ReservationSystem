import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCompanies();
  }


  getCompanies() {
    this.http.get('https://localhost:44383/api/Companies').subscribe( res => {
      this.users = res
    }, error => console.log("error")
    )
  }
}
