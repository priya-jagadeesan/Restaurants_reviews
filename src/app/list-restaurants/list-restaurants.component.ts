import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})
export class ListRestaurantsComponent implements OnInit {

  delOrRetrErrors = "";
  restaurants: any;
  edit = false;
  editRestaurant: any;
  enableDelete = false;
  now: any;
  time_diff: any;
  refresh: any;

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getRestaurantss();
    this.refresh = setInterval(() => { this.getRestaurantss() }, 30000);
  }

  getRestaurantss() {
    console.log("Get all restaurants in component")
    this.delOrRetrErrors = "";
    let obs = this._httpService.getRestaurants();
    obs.subscribe(data => {
      console.log("Get all restaurants in component - data", data)
      if (data['message'] == 'success') {
        console.log("Get all restaurants in component - Success", data)
        this.restaurants = data['data'];
        for (let i of this.restaurants) {
          // console.log('--------------------')
          // console.log("db : ", i._id);
          console.log("db : ", i.created_at);
          // let db_created_at = new Date(i.created_at)
          // console.log("parse : ", Date.parse(i.created_at));
          // console.log("parse : ", typeof(Date.parse(i.created_at)));
          console.log("dateC : ", new Date(i.created_at));
          // i['time_diff'] = this.timediffer(db_created_at);
          i['time_diff'] = this.time_differ(i._id,Date.parse(i.created_at));
        }
      }
      else if (data['message'] == 'error') {
        console.log("Get all restaurants in component - Error", data['data'])
        this.delOrRetrErrors = "Error retreiving the Restaurants"
      }
    })
  }

  time_differ( ID,date_created_at) {
    let date_now = new Date();
    console.log("date : ", date_now);
    // console.log("date : ", Date.now());
    // console.log("date : ", date_now.getTime());
    // get total seconds between the times
    // console.log(typeof(date_now.getTime()))
    var delta = Math.abs(date_now.getTime() - date_created_at) / 1000;
    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    if (days) {
      console.log(` > 30s : ${ID}  days ${days}`);
      return false;
    }
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    if (hours) {
      console.log(` > 30s : ${ID}  hours ${hours}`);
      return false;
    }
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    if (minutes) {
      console.log(` > 30s : ${ID}  minutes ${minutes}`);
      return false;
    }
    delta -= minutes * 60;
    // what's left is seconds
    var seconds =  Math.floor(delta % 60);  // in theory the modulus is not required
    // console.log (`days ${days}, hours ${hours}, minutes ${minutes},seconds ${seconds}`);
    // if (days || hours || minutes) {
    //   console.log(`days ${days}, hours ${hours}, minutes ${minutes},seconds ${seconds}`);
    //   return true;
    // }
    if (seconds > 30) {
      console.log(` > 30s : ${ID}  days ${days}, hours ${hours}, minutes ${minutes},seconds ${seconds}`);
      return false;
    }
    else if (seconds < 30) {
      console.log(` < 30s : ${ID}  days ${days}, hours ${hours}, minutes ${minutes},seconds ${seconds}`);
      return true;
    }
  }


  getReviews(ID) {
    this.router.navigate([`/reviews/${ID}`]);
  }

  updateRestaurant(restaurant) {
    this.edit = true;
    console.log("call update - edit component", restaurant)
    this.editRestaurant = restaurant;
  }

  editRefresh(eventData) {
    this.edit = eventData;
    console.log("edit refresh - edit component")
    this.getRestaurantss();
  }

  deleteRestaurant(ID) {
    this.delOrRetrErrors = "";
    let obs = this._httpService.deleteRestaurantByID(ID);
    obs.subscribe(data => {
      if (data['message'] == 'success') {
        this.getRestaurantss();
      }
      else if (data['message'] == 'error') {
        console.log("Get all products in component - Error", data['data'])
        this.delOrRetrErrors = "Error deleting"
      }
    })
  }
}
