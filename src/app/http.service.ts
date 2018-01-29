import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  }

  getRestaurants() {
    console.log("Get all restaurants data in Service")
    return this._http.get('/restaurants');
  }

  getRestaurantByID(ID) {
    console.log("Get restaurants data by _id in Service",ID)
    return this._http.get('/restaurants/' + ID);
  }

  createRestaurant(newRestaurant) {
    console.log("Post/create restaurants data in Service",newRestaurant)
    return this._http.post('/restaurants', newRestaurant);
  }

  updateRestaurantByID(ID, updateRestaurant) {
    console.log("Put/update restaurants data by _id in Service",ID,updateRestaurant)
    return this._http.put('/restaurants/' + ID, updateRestaurant);
  }

  updateRestaurantReviewByID(ID, updateRestaurantReview) {
    console.log("Put/update restaurants data by _id in Service",ID,updateRestaurantReview)
    return this._http.put('/reviews/' + ID, updateRestaurantReview);
  }

  deleteRestaurantByID(ID) {
    console.log("Delete restaurants data by _id in Service", ID)
    return this._http.delete('/restaurants/' + ID);
  }

}
