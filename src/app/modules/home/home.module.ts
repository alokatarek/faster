import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AdsComponent } from './home/ads/ads.component';
import { StoreTypesComponent } from './home/store-types/store-types.component';
import { StorePlacesComponent } from './home/store-places/store-places.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

import { DetailsStorePlacesComponent } from './home/store-places/details-store-places/details-store-places.component';
import { CartComponent } from './cart/cart.component';
import { DeleteCartDialogComponent } from './cart/delete-cart-dialog/delete-cart-dialog.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AdsComponent,
    StoreTypesComponent,
    StorePlacesComponent,
    HomeComponent,
    DetailsStorePlacesComponent,
    CartComponent,
    DeleteCartDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
  ],
})
export class HomeModule {}
