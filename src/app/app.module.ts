import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { AppComponent } from './app.component';
import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component';
import { ListRestaurantsComponent } from './list-restaurants/list-restaurants.component';
import { EditRestaurantsComponent } from './list-restaurants/edit-restaurants/edit-restaurants.component';
import { WriteReviewComponent } from './write-review/write-review.component';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    NewRestaurantComponent,
    ListRestaurantsComponent,
    EditRestaurantsComponent,
    WriteReviewComponent,
    ListReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StarRatingModule.forRoot()
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
