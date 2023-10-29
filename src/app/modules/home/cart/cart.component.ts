import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeliveryCostService } from '../../user/services/delivery-cost.service';
import { DeleteCartDialogComponent } from './delete-cart-dialog/delete-cart-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  itemQuantity = 1;
  CartItems: any[] = [];
  totalPrice: number = 0;
  
  cartItemsLocalStorage = localStorage.getItem('cartItems');
  cartItemCount = JSON.parse(this.cartItemsLocalStorage!)?.length || 0;

  constructor(public deleteDialog: MatDialog,private _deliveryCostService:DeliveryCostService,private _router:Router) {}

  ngOnInit(): void {
    let cartItems = localStorage.getItem('cartItems');
        debugger
    if (cartItems) {
      this.CartItems = JSON.parse(cartItems);
      this.CartItems.map((product: any) => {
        product.totalPriceOfCartItem =
          product.item.productPriceSelected * product.quantity;
        this.totalPrice = this.totalPrice + product.totalPriceOfCartItem;
        localStorage.setItem('totalCartPrice', JSON.stringify(this.totalPrice))
      });
    }
  }

  openDeleteDialog(itemCartId: number) {
    const dialogRef = this.deleteDialog.open(DeleteCartDialogComponent, {
      width: '30%',
      minWidth: '200px',
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.event === 'delete') {
        this.totalPrice = this.totalPrice - this.CartItems[itemCartId].totalPriceOfCartItem 
        localStorage.setItem('totalCartPrice', JSON.stringify(this.totalPrice))
        this.CartItems.splice(itemCartId, 1);
        localStorage.setItem('cartItems',JSON.stringify(this.CartItems))
        let cartItemsLocalStorage = localStorage.getItem('cartItems');
        this.cartItemCount = JSON.parse(cartItemsLocalStorage!).length;
      }
    });
  }
  increaseQuantity(index: number) {
    this.CartItems[index].quantity = this.CartItems[index].quantity + 1;
    this.CartItems[index].totalPriceOfCartItem =
      this.CartItems[index].quantity *
      this.CartItems[index].item.productPriceSelected;
    this.totalPrice =
      this.totalPrice + this.CartItems[index].item.productPriceSelected;
      localStorage.setItem('totalCartPrice', JSON.stringify(this.totalPrice))
  }

  decreaseQuantity(index: number) {
    if (this.CartItems[index].quantity === 1) return;
    this.CartItems[index].quantity = this.CartItems[index].quantity - 1;
    this.CartItems[index].totalPriceOfCartItem =
      this.CartItems[index].totalPriceOfCartItem -
      this.CartItems[index].item.productPriceSelected;
    this.totalPrice =
      this.totalPrice - this.CartItems[index].item.productPriceSelected;
      localStorage.setItem('totalCartPrice', JSON.stringify(this.totalPrice))
  }


  getDeliveryCost(){
    debugger
    let cartItemsId:number[] = []
      this.CartItems.map((item:any)=>{
         cartItemsId.push(item.item.id)     
    })
    let areaId = localStorage.getItem('areaID')!
    this._deliveryCostService.getDeliveryCost(cartItemsId,areaId).subscribe({
      next:(res:any)=>{
        
        this._router.navigate([`user/order`],{
          queryParams:{
            deliveryCost:res.data,
          }
        })

        // this.goToCheckoutComponent()
      }
    })
  }
  goToCheckoutComponent(){
    this._router.navigate(['user/order'])
  }
}
