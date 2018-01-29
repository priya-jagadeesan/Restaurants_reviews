import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {

  // create new review
  restaurant = { name : ""}
  delOrRetrErrors = "";
  star = [{ 'val': '1 star' }, 
          { 'val': '2 star' }, 
          { 'val': '3 star' }, 
          { 'val': '4 star' }, 
          { 'val': '5 star' }];
  new_Review = { "customer_name": "", "content": "", in_star: this.star[0].val , stars: 1 };
  new_nameErrors: String = "";
  new_contentErrors: String = "";
  new_validProduct = true;
  restaurant_id = "";

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.restaurant_id = params['id'];
      this.getRestaurantById(params['id']);
    });
  }

  getRestaurantById(ID) {
    console.log("Get all getRestaurants in component")
    this.delOrRetrErrors = "";
    let obs = this._httpService.getRestaurantByID(ID);
    obs.subscribe(data => {
      console.log("Get all products in component", data)
      if (data['message'] == 'success') {
        console.log("Get all products in component - Success", data)
        this.restaurant = data['data'];
      }
      else if (data['message'] == 'error') {
        console.log("Get all products in component - Error", data['data'])
        this.delOrRetrErrors = "Error retreiving the Products"
      }
    })
  }

  createReview() {
    console.log("Create new reviews in component")
    this.new_nameErrors = "";
    this.new_contentErrors = ""; 
    if (this.new_Review.in_star == '1 star') {
      this.new_Review.stars = 1;
    }
    if (this.new_Review.in_star == '2 star') {
      this.new_Review.stars = 2;
    }
    if (this.new_Review.in_star == '3 star') {
      this.new_Review.stars = 3;
    }
    if (this.new_Review.in_star == '4 star') {
      this.new_Review.stars = 4;
    }
    if (this.new_Review.in_star == '5 star') {
      this.new_Review.stars = 5;
    }
    this.restaurant['customer_name'] = this.new_Review.customer_name;
    this.restaurant['content'] = this.new_Review.content;
    this.restaurant['stars'] = this.new_Review.stars;
    let obs = this._httpService.updateRestaurantReviewByID(this.restaurant_id, this.restaurant);
    obs.subscribe(data => {
      if (data['message']) {
        if (data['message'] == 'error') {
          console.log(data['data'])
          if (data['data'].customer_name) {
            console.log("Create new products in component - name error", data['data'])
            this.new_nameErrors += data['data'].customer_name.message + " ";
          }
          if (data['data'].content) {
            console.log("Create new products in component - cuisine error", data['data'])
            this.new_contentErrors += data['data'].content.message + " ";
          }
        }
        else {
          this.new_validProduct = false;
          this.new_Review = { "customer_name": "", "content": "", in_star: this.star[0].val , stars: 1 };
          this.new_nameErrors = "";
          this.new_contentErrors = "";
          this.gotoRestaurantsList();
        }
      }
    });
  }

  gotoRestaurantsList() {
    this.router.navigate([`/reviews/${this.restaurant_id}`]);
  }

  cancelCreate() {
    this.router.navigate([`/reviews/${this.restaurant_id}`]);
  }

  onChangeStar(newStar) {
    this.new_Review.in_star = newStar;
  }
}
