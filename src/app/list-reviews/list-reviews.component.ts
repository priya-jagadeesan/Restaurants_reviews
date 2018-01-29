import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {
  delOrRetrErrors = "";
  reviews: any;
  restaurant_id = "";
  restaurant_name = "";
  constructor(private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.restaurant_id = params['id'];
      this.getReviews(this.restaurant_id)
    })
  }

  getReviews(ID) {
    console.log("Get all getReviews in component")
    this.delOrRetrErrors = "";
    let obs = this._httpService.getRestaurantByID(ID);
    obs.subscribe(data => {
      console.log("Get all getReviews in component", data)
      if (data['message'] == 'success') {
        console.log("Get all getReviews in component - Success", data['data'].reviews)
        this.reviews = data['data'].reviews;
        this.restaurant_name = data['data'].name;
        for (let review of this.reviews){
          if(review.stars == 1){
            review.stars = '★☆☆☆☆'
          }
          else if(review.stars == 2){
            review.stars = '★★☆☆☆'
          }
          else if(review.stars == 3){
            review.stars = '★★★☆☆'
          }
          else if(review.stars == 4){
            review.stars = '★★★★☆'
          }
          else if(review.stars == 5){
            review.stars = '★★★★★'
          }
        }

      }
      else if (data['message'] == 'error') {
        console.log("Get all getReviews in component - Error", data['data'])
        this.delOrRetrErrors = "Error retreiving the Products"
      }
    })
  }

  gotoWrite() {
    this.router.navigate([`/write/${this.restaurant_id}`]);
  }

  gotoCancel() {
    this.router.navigate([`/`]);
  }
}
