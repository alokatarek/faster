import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { DetailsStorePlacesComponent } from './home/store-places/details-store-places/details-store-places.component';

const routes: Routes = [
  {path:'store-places-details/:id',component:DetailsStorePlacesComponent},
  {path:'cart',component:CartComponent},

  {path:'' , component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
