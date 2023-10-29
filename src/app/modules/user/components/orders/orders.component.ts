import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Orders } from '../../interfaces/orders.interface';
import { OrdersService } from '../../services/orders.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

export interface IImage { 
  image : any
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  customerId: string;
  ordersData: Orders[] = [];
  orderItemsData: any;
  orderDeletedId: string = '';
  orderDataCount: number = 1;

  // order details
  stateDropdownData: any;
  cityDropdownDataFrom: any;
  areaDropdownDataFrom: any;
  cityDropdownDataTo: any;
  areaDropdownDataTo: any;
  vehicleTypesList: any;
  disableAccept: boolean = false;
  rejectReason: string = '';
  orderRejected: boolean = false;
  selectedOrder_StatusID: number | undefined;
  shippingForm = this.fb.group({
    name: [{ value: '' }],
    shippmentDesc: [{ value: '' }],
    addressFrom: [{ value: '' }],
    addressTo: [{ value: '' }],
    orderStatusName: [{ value: '' }],
    shippingCustomerPhone: [{ value: '' }],
    vehiclesTypesId: [{ value: '' }],
    widthOfShipment: [{ value: '' }],
    heightOfShipment: [{ value: '' }],
    lengthOfShipment: [{ value: '' }],
    notes: [{ value: '' }],
    orderType: [{ value: '' }],
    total: [{ value: '' }],
  });
  selectedShipmentOrder: any;
  showFlag : boolean = false
  imageObject: IImage[] = [];
  totalItems: any;
  totalDeliveryCost: any;
  payedUp: any;

  constructor(
    private _ordersService: OrdersService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.customerId = localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.getAllCustomerOrders();
    this.getAllVehicleTypes();

    // this.checkAcceptBtn()
  }

  showImage (imageUrl: any) {
    this.imageObject.push({image : imageUrl})
    this.showFlag = true
   }
   closeEventHandler() {
    this.showFlag = false;
    this.imageObject = []
  }

  getAllCustomerOrders() {
    this._ordersService.getAllCustomerOrders(this.customerId).subscribe({
      next: (res: any) => {
        this.ordersData = res.data;
        console.log('ordersData : ', this.ordersData);

        this.orderDataCount = res.dataCount;
      },
    });
  }

  getOrderItems(order: any) {
    debugger;
  
     this.selectedOrder_StatusID = order.orderStatusId
    if (order.orderType === 1) {
      this.selectedShipmentOrder = order
      this.shippingForm.patchValue({
        name: order.shippingCustomerName,
        shippmentDesc: order.shipmentDesc,
        addressFrom: order.addressFrom,
        addressTo: order.addressTo,
        orderStatusName: order.orderStatusName,
        shippingCustomerPhone: order.shippingCustomerPhone,
        vehiclesTypesId: order.vehiclesTypesId,
        widthOfShipment: order.widthOfShipment,
        heightOfShipment: order.heightOfShipment,
        lengthOfShipment: order.lengthOfShipment,
        notes: order.notes,
        orderType: order.orderType === '0' ? 'طلب توصيل' : 'طلب نقل',
        total: order.deliveryCost === 0 ? null : order.deliveryCost,
      });
    } else {
      this._ordersService.getOrderItems(order.id).subscribe({
        next: (res: any) => {
          debugger
          this.orderItemsData = res.data;
          this.totalItems = this.orderItemsData.totalItems
          this.totalDeliveryCost = this.orderItemsData.totalDeliveryCost
          this.payedUp = this.orderItemsData.payedUp
        },
      });
    }
  }

  setOrderDeletedId(orderDeletedId: string) {
    this.orderDeletedId = orderDeletedId;
  }

  deleteOrder() {
    this._ordersService.deleteOrder(this.orderDeletedId).subscribe({
      next: (res: any) => {
        this.getAllCustomerOrders();
        this._snackBar.open('تم الحذف بنجاح !', 'x', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['toast-success'],
        });
      },
      error: (err) => {
        this._snackBar.open('لم يتم الحذف !', 'x', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['toast-failed'],
        });
      },
    });
  }

  // order details methods

  // get all Vehicles types
  getAllVehicleTypes() {
    this._ordersService.getDropDownListVehiclesTypes().subscribe({
      next: (res) => {
        this.vehicleTypesList = res.data;
        console.log('this.vehicleTypesList : ', this.vehicleTypesList);
      },
    });
  }

  acceptShipmentOrder(type : boolean, rejectReason? : string) {
    debugger
    let requestBody : any = {
      isAccept : type,
       cipheredOrderID: this.orderItemsData ?  this.orderItemsData.cipheredOrderID : this.selectedShipmentOrder.id,
      }
      if (rejectReason) {
        requestBody.rejectReason = rejectReason
      }

    this._ordersService
      .shipmentClientAccept(requestBody)
      .subscribe({
        next: (res) => {
          if (res.result === 1) {
            let message = rejectReason ? 'تم رفض الطلب بنجاح !' : 'تم الموافقة علي الطلب بنجاح !'
            this._snackBar.open(message, 'x', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
              panelClass: ['toast-success'],
            });
          } else {
            this._snackBar.open(res.note, 'x', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
              panelClass: ['toast-danger'],
            });
          }
        },
      });

  }

  checkBeforeReject() {
    Swal.fire({
      title: 'هل أنت متأكد ؟',
      text: 'لن تسطيع العودة في قرارك عن الموافقة ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#bababa',
      confirmButtonText: 'نعم , رفض الطلب',
      cancelButtonText: 'الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.acceptShipmentOrder(false, this.rejectReason);
      }
    });
  }

  // rejectShipmentOrder() {
  //   this._ordersService
  //     .rejectShipmentAdmin(this.orderItemsData.cipheredOrderID)
  //     .subscribe({
  //       next: (res) => {
  //         if (res.result === 200) {
  //           this._snackBar.open('تم الغاء الطلب بنجاح !', 'x', {
  //             horizontalPosition: 'center',
  //             verticalPosition: 'top',
  //             duration: 3000,
  //             panelClass: ['toast-success'],
  //           });
  //         } else {
  //           this._snackBar.open(res.note, 'x', {
  //             horizontalPosition: 'center',
  //             verticalPosition: 'top',
  //             duration: 3000,
  //             panelClass: ['toast-danger'],
  //           });
  //         }
  //         this.orderRejected = false;
  //       },
  //     });
  // }

  // checkAcceptBtn (){
  //   if (this.shippingForm.get('vehiclesTypesId')?.value == null || this.shippingForm.get('total')?.value === 0 || this.shippingForm.get('total')?.value === null ) {
  //     this.disableAccept = true
  //   }
  //   else{
  //     this.disableAccept = false
  //   }
  // }
}
