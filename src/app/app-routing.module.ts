import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component';
import { ListRestaurantsComponent } from './list-restaurants/list-restaurants.component';
import { WriteReviewComponent } from './write-review/write-review.component';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';

const routes: Routes = [
  { path: 'new', component: NewRestaurantComponent },
  // { path: 'products/new', component: ProductCreateComponent },
  { path: 'reviews/:id', component: ListReviewsComponent },
  { path: 'write/:id', component: WriteReviewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: ListRestaurantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
