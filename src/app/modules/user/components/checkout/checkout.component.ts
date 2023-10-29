import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOrder } from '../../interfaces/add-order.interface';
import { OrdersService } from '../../services/orders.service';
import * as SignalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  deliveryCost: any;
  areaId: string;
  customerId: string;
  orderAddresses: any;
  phone: any;
  orderItems: any[] = [];
  connections: any;
  totalBeforeDelivery: number = 0;
  totalAfterDelivery: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _ordersService: OrdersService,
    private _router: Router
  ) {
    this._activatedRoute.queryParams.subscribe((query) => {
      // ;
      this.deliveryCost = query['deliveryCost'];
    });
    this.totalBeforeDelivery = Number(localStorage.getItem('totalCartPrice'));
    this.totalAfterDelivery =
      Number(localStorage.getItem('totalCartPrice')) +
      Number(this.deliveryCost);
    this.customerId = localStorage.getItem('userId')!;
    this.areaId = localStorage.getItem('areaID')!;
  }

  checkoutForm: FormGroup = this._formBuilder.group({
    payedUp: [''],
    areaId: ['', Validators.required],
    fullAddress: [''],
  });
  ngOnInit(): void {
    this.startOrderNotificationConnection();
    this.getOrderAddresses();

    // const message = 'new order!';
    // this.connections.invoke('SendNotifications', message).catch(function (err: any) {
    //     console.log(err);
    //   });
  }

  getOrderAddresses() {
    this._ordersService
      .getOldOrderAddresses(this.customerId, this.areaId)
      .subscribe({
        next: (res: any) => {
          this.orderAddresses = res.data;
          // set area id of current address that user selected in address page
          this.orderAddresses.map((address: any) => {
            if (address.isCurrentAddress)
              this.checkoutForm.controls['areaId'].setValue(address.areaID);
          });
          this.phone = res.otherData[0].customerPhone;
        },
      });
  }
  checkoutSubmit() {
    // ;
    //  this.checkoutForm.controls['areaId'].setValue('1')
    debugger;
    if (!this.checkoutForm.valid) return;
    this.setOrderItemsValues();
    let checkoutObject: AddOrder = {
      payedUp: this.checkoutForm.controls['payedUp'].value,
      areasId: parseInt(this.checkoutForm.controls['areaId'].value),
      items: this.orderItems,
      customerId: this.customerId,
      fullAddress: this.checkoutForm.controls['fullAddress'].value,
    };
    this.addOrder(checkoutObject);
  }

  setOrderItemsValues() {
    let cartItems = [];

    cartItems = JSON.parse(localStorage.getItem('cartItems')!);
    let orderItem;
    cartItems.map((item: any) => {
      orderItem = {
        quantity: item.quantity,
        itemsId: item.item.id,
        sizesId: item.item.prices[0].sizesID,
        ItemImageUrl: item.item.mustAddImage ? item.item.ItemImageUrl : '',
      };
      // if(item.mustAddImage == true) orderItem.ItemImageUrl= item.ItemImageUrl
      this.orderItems.push(orderItem);
    });
  }

  addOrder(checkoutObject: AddOrder) {
    this._ordersService.addOrder(checkoutObject).subscribe({
      next: (res: any) => {
        if (res.result === 1) {
          this.sendNotification();
          localStorage.removeItem('cartItems');
          this._router.navigate(['user/orders']);
        }
      },
    });
  }

  // start notification handling

  startOrderNotificationConnection() {
    this.connections = new SignalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + 'notificationsHub')
      .build();
    this.connections
      .start()
      .then(function () {
        console.log('connection start =============>');
      })
      .catch(function () {
        console.log('err');
      });
  }

  sendNotification() {
    const message = 'new order!';
    this.connections
      .invoke('SendNotifications', message)
      .catch(function (err: any) {
        console.error(err);
      });
  }
}
