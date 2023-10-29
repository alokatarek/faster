import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/modules/user/services/orders.service';
import { Category } from '../../../interfaces/category.interface';
import { StorePlace } from '../../../interfaces/store-place.interface';
import { ItemsService } from '../../../services/items.service';
import { StorePlacesService } from '../../../services/store-places.service';
import { StoreTypesService } from '../../../services/store-types.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-details-store-places',
  templateUrl: './details-store-places.component.html',
  styleUrls: ['./details-store-places.component.css'],
})
export class DetailsStorePlacesComponent implements OnInit {
  storeTypeId: number = 0;
  storeTypeImage: string = '';
  storePlaceId: number = 0;
  storePlaceDetails!: StorePlace;
  categoriesData!: Category[];
  dataCount: number = 0;
  counter: number = 0;
  pagesCount: number = 0;
  categoryId: number = 0;
  productsData: any;
  productSizeId: number = 1;
  productId: number = 1;
  productPriceSelected: any;
  catSelectedName: string = '';
  itemQuantity = 1;
  cartItems: any = [];
  indexOfItemCart: number = 1;
  pageNumber: number = 1;
  currentPage: number = 1;
  productDataCount: number = 1;
  cartItemsLocalStorage = localStorage.getItem('cartItems');
  cartItemCount = JSON.parse(this.cartItemsLocalStorage!)?.length || 0;

  image: any;
  imagePath: any = '../../../../../../assets/images/img-temp.png';
  isMustAddImage = false;
  isAddImageForItem: boolean = false;
  isLoading: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<span><</span>', '<span>></span>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
    margin: 15,
  };

  constructor(
    private _storeTypesService: StoreTypesService,
    private _storePlacesService: StorePlacesService,
    private _itemService: ItemsService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _ordersService: OrdersService
  ) {
    this._activatedRoute.params.subscribe((param) => {
      this.storePlaceId = parseInt(param['id']);
    });
    // to get item that come from ad
    this._activatedRoute.queryParams.subscribe((query: any) => {
      if (query.catId) this.getSelectCategory(query.catId);
    });
  }

  ngOnInit(): void {
    let cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartItems = JSON.parse(cartItems!);
    }

    this.getStorePlacesById();
  }

  getStorePlacesById() {
    this._storePlacesService.getStorePlaceByID(this.storePlaceId).subscribe({
      next: (res) => {
        debugger;
        this.storePlaceDetails = res.data;
        this.storeTypeId = this.storePlaceDetails?.storeTypeID;
        // this.getStoreTypeById();
        this.getAllCategories('next');
      },
    });
  }
  getStoreTypeById() {
    this._storeTypesService.getStoreTypeByID(this.storeTypeId).subscribe({
      next: (res) => {
        this.storeTypeImage = res.data.imageURL;
      },
    });
  }

  getAllCategories(buttonType: string) {
    debugger;
    if (buttonType === 'next') {
      this.counter = this.counter + 1;
    } else {
      this.counter = this.counter - 1;
    }
    if (this.counter < 1) this.counter = this.pagesCount;
    if (this.counter > this.pagesCount && this.pagesCount) this.counter = 1;

    this._itemService
      .getAllCategory(this.storePlaceId, this.counter, 100000)
      .subscribe({
        next: (res: any) => {
          // if (
          //   res.data?.length < 3 &&
          //   res.data?.length > 0 &&
          //   res.pageCount > 2
          // ) {
          //   if (res.data.length === 2) {
          //     this.categoriesData[2] = this.categoriesData[0];
          //     this.categoriesData[0] = res.data[0];
          //     this.categoriesData[1] = res.data[1];
          //   } else if (res.data.length === 1) {
          //     this.categoriesData[2] = this.categoriesData[0];
          //     this.categoriesData[0] = res.data[0];
          //   }
          // } else {
          //   this.categoriesData = res.data;
          //   this.dataCount = res.dataCount;
          // }

          // this.pagesCount = res.pageCount;
          // // }
          this.categoriesData = res.data;
        },
      });
  }
  // getAllCategories(ButtonType:any) {
  //   this._itemService.getAllCategory(this.storePlaceId).subscribe({
  //     next: (res) => {
  //       this.categoriesData = res.data;
  //     },
  //   });
  // }
  getSelectCategory(categoryId: number) {
    this.categoryId = categoryId;
    this.getAllProducts();
  }
  setCatSelectedName(catSelectedName: string) {
    this.catSelectedName = catSelectedName;
  }
  getAllProducts() {
    this.isLoading = true;
    this._itemService
      .getAllItems(this.storePlaceId, this.categoryId, this.pageNumber, 20)
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          return throwError(err);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.productSizeId = 1;
          this.productsData = res.data;
          this.productDataCount = res.dataCount;
          this.productsData?.map((product: any) => {
            product.productPriceSelected = product.prices[0].price;
            product.productSizeSelected = product.prices[0].sizesID;

            this.cartItems?.map((item: any) => {
              if (product.id === item.item.id) {
                product.isDisabled = true;
              }
            });
          });
        },
      });
  }

  // product size radio button
  setProductSizeRadioButton(selected: any, indexOfProductChangePrice: number) {
    console.log(this.productsData);
    this.productsData[indexOfProductChangePrice].productPriceSelected =
      selected.price;
    this.productsData[indexOfProductChangePrice].productSizeSelected =
      selected.sizesID;
  }

  // pagination

  pageChanged(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pageNumber = pageNumber;
    this.getAllProducts();
  }

  // modal cart
  // quantity itemCart

  increaseQuantity() {
    this.itemQuantity = this.itemQuantity + 1;
  }

  decreaseQuantity() {
    if (this.itemQuantity === 1) return;
    this.itemQuantity = this.itemQuantity - 1;
  }
  // cancel button of modal
  resetQuantityCounter() {
    this.itemQuantity = 1;
  }

  setItemCartIndex(index: number, mustAddImage: boolean) {
    this.indexOfItemCart = index;
    this.isMustAddImage = mustAddImage;
  }
  addItemToCart() {
    if (this.isMustAddImage) {
      if (!this.image) {
        this.isAddImageForItem = false;
        return;
      }
      this.isAddImageForItem = true;

      this._ordersService.uploadImageForItems(this.image).subscribe({
        next: (res) => {
          if (res.result === 1) {
            this.productsData[this.indexOfItemCart].ItemImageUrl = res.data;
            this.pushNewItemInCart();
            this.deleteImage();
          }
        },
      });
    } else {
      this.pushNewItemInCart();
    }
  }
  pushNewItemInCart() {
    this.cartItems.push({
      quantity: this.itemQuantity,
      item: this.productsData[this.indexOfItemCart],
    });
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.productsData[this.indexOfItemCart].isDisabled = true;
    this._snackBar.open(
      `تمت اضافة  ${
        this.productsData[this.indexOfItemCart].name
      } إلى السلة بنجاح !`,
      'x',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['toast-success'],
      }
    );
    let cartItemsLocalStorage = localStorage.getItem('cartItems');
    this.cartItemCount = JSON.parse(cartItemsLocalStorage!).length;
    this.itemQuantity = 1;
  }
  // if(cartItems){
  //

  // }
  // this.cartItemCount=1

  //------------------------ image handel -----------------//

  isAddImage = false;

  checkImage(event: any) {
    //
    this.image = event.target.files[0];
    this.isAddImage = true;
    // this.image.setValue(event.target.files[0]);

    // this._ordersService.imagesOfItems.push(event.target.files[0])
    // this.modalForm.controls['changeImage'].setValue(true)
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }

  clearOldImageFromEvent(event: any) {
    console.log(event.target.value, 'in clearOldImageFromEvent');
    event.target.value = null;
  }

  deleteImage() {
    this.imagePath = '../../../../../assets/images/img-temp.png';
    this.image = null;
    this.isAddImage = false;
    // this.image.setValue('');
    // this.modalForm.controls['changeImage'].setValue(true)
    // this.changeImage = true
  }
}
