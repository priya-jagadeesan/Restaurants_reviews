import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.css']
})
export class NewRestaurantComponent implements OnInit {

  new_Restaurant = { name: "", cuisine: "" }
  new_nameErrors = "";
  new_cuisineErrors = "";
  new_validRestaurant = true;

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  createRestaurant() {
    console.log("Create new restaurants in component")
    this.new_nameErrors = "";
    this.new_cuisineErrors = "";
    let obs = this._httpService.createRestaurant(this.new_Restaurant);
    obs.subscribe(data => {
      if (data['message']) {
        if (data['message'] == 'error') {
          if (data['data'].code) {
            console.log("Create new restaurants in component - duplicate error", data['data'].code)
            this.new_nameErrors += "Restaurant name already exists" + " ";
          }
          if (data['data'].errors) {
            if (data['data'].errors.name) {
              console.log("Create new restaurants in component - name error", data['data'])
              this.new_nameErrors += data['data'].errors.name.message  + " ";
            }
            if (data['data'].errors.cuisine) {
              console.log("Create new restaurants in component - cuisine error", data['data'])
              this.new_cuisineErrors += data['data'].errors.cuisine.message + " ";
            }
          }
        }
        else {
          this.new_validRestaurant = false;
          this.new_Restaurant = { "name": "", "cuisine": "" };
          this.new_nameErrors = "";
          this.new_cuisineErrors = "";
          this.gotoRestaurantsList();
        }
      }
    });
  }

  gotoRestaurantsList() {
    console.log("goto to restaurants page")
    this.router.navigate(['/']);
  }

  onCancel(){
    console.log("goto to restaurants page")
    this.router.navigate(['/']);
  }

}
