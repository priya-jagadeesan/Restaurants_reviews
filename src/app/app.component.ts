import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
  }


}

