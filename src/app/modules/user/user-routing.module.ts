import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { IsLoginGuard } from 'src/app/guards/is-login.guard';
import { AddressComponent } from './components/address/address.component';
import { AuthComponent } from './components/auth/auth.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PointsComponent } from './components/points/points.component';
import { PreviousOrdersComponent } from './components/previous-orders/previous-orders.component';
import { ProvideDeliveryManComponent } from './components/provide-delivery-man/provide-delivery-man.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { TableReservationsComponent } from './components/table-reservations/table-reservations.component';

const routes: Routes = [
  {path:"orders" , component:OrdersComponent,canActivate:[AuthGuardGuard]},
  {path:"points" , component:PointsComponent},
  {path:"previous-orders" , component:PreviousOrdersComponent},
  {path:"provide-delivery-man" , component:ProvideDeliveryManComponent},
  {path:"shipping" , component:ShippingComponent},
  {path:"table-reservations" , component:TableReservationsComponent},
  {path:"address" , component:AddressComponent},
  {path:"auth",component:AuthComponent,canActivate:[IsLoginGuard]},
  {path:"order",component:CheckoutComponent,canActivate:[AuthGuardGuard]}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
