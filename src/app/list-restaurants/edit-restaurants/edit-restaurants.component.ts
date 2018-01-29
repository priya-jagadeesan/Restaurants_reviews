import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-restaurants',
  templateUrl: './edit-restaurants.component.html',
  styleUrls: ['./edit-restaurants.component.css']
})
export class EditRestaurantsComponent implements OnInit {

  @Input() edit: boolean;
  @Input() editRestaurant: any;

  @Output() restaurantEmitter = new EventEmitter();

  // editRestaurant = { "name": "", "cuisine": "" };
  new_nameErrors: String = "";
  new_cuisineErrors: String = "";
  new_validProduct = true;

  restaurants: any;
  delOrRetrErrors = "";

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
  }

  getRestaurantById(ID) {
    console.log("Get getRestaurant by ID in component", ID)
    this.delOrRetrErrors = "";
    let obs = this._httpService.getRestaurantByID(ID);
    obs.subscribe(data => {
      console.log("Get getRestaurant by ID in  component - data", data)
      if (data['message'] == 'success') {
        console.log("Get getRestaurant by ID in  component - Success", data)
        this.restaurants = data['data'];
        this.editRestaurant = data['data'];
      }
      else if (data['message'] == 'error') {
        console.log("Get getRestaurant by ID in  component - Error", data['data'])
        this.delOrRetrErrors = "Error retreiving the Products"
      }
    })
  }

  updateRestaurant() {
    console.log("Update getRestaurant by ID - in component")
    this.new_nameErrors = "";
    this.new_cuisineErrors = "";
    let obs = this._httpService.updateRestaurantByID(this.editRestaurant._id, this.editRestaurant);
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
          this.new_validProduct = false;
          this.editRestaurant = { "name": "", "cuisine": "" };
          this.new_nameErrors = "";
          this.new_cuisineErrors = "";
          this.restaurantEmitter.emit(false);
        }
      }
    });
  }

  onCancel() {
    this.restaurantEmitter.emit(false);
  }
}
