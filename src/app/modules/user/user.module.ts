import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { PointsComponent } from './components/points/points.component';
import { PreviousOrdersComponent } from './components/previous-orders/previous-orders.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { TableReservationsComponent } from './components/table-reservations/table-reservations.component';
import { ProvideDeliveryManComponent } from './components/provide-delivery-man/provide-delivery-man.component';
import { AddressComponent } from './components/address/address.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './components/auth/auth.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    OrdersComponent,
    PointsComponent,
    PreviousOrdersComponent,
    ShippingComponent,
    TableReservationsComponent,
    ProvideDeliveryManComponent,
    AddressComponent,
    AuthComponent,
    CheckoutComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    NgImageFullscreenViewModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }
