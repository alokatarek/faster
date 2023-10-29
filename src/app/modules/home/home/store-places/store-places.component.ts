import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StorePlacesService } from '../../services/store-places.service';

@Component({
  selector: 'app-store-places',
  templateUrl: './store-places.component.html',
  styleUrls: ['./store-places.component.css'],
})
export class StorePlacesComponent implements OnInit {
  storePlacesData: any;
  counter: number = 0;
  pagesCount: any;
  imageSource: any;
  storePlaceDesc: any;
  storePlaceName: any;

  @Input() storeTypeId: number = 0;
  storePlaceId: any;
  storePlaceRoute: string = '';
  dataCount: any;
  noImageStore: string = '../../../../../assets/images/storeImage(found).jpg';
  cityID: number = Number(localStorage.getItem('cityID'));

  constructor(
    private _storePlacesService: StorePlacesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStorePlaces('next');

    if (this.storePlacesData) {
    }
  }

  // getAllStorePlaces(){
  //   this._storePlacesService.getAllStorePlace().subscribe(({
  //     next : (res:any)=>{
  //       this.storePlacesData = res.data
  //     }
  //   }))
  // }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ['<', '>'],
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
  };
  getAllStorePlaces(buttonType: string) {
    if (buttonType === 'next') {
      this.counter = this.counter + 1;
    } else {
      this.counter = this.counter - 1;
    }
    if (this.counter < 1) this.counter = this.pagesCount;
    if (this.counter > this.pagesCount) this.counter = 1;

    this._storePlacesService
      .getAllStorePlace(1, 100, this.storeTypeId, this.cityID)
      .subscribe({
        next: (res: any) => {
          // if (res.data?.length < 3 && res.data?.length > 0) {
          //   if (res.data.length === 2) {
          //     this.storePlacesData[2] = this.storePlacesData[0];
          //     this.storePlacesData[0] = res.data[0];
          //     this.storePlacesData[1] = res.data[1];
          //   } else if (res.data.length === 1 &&this.storePlacesData?.length > 2 ) {
          //     this.storePlacesData[2] = this.storePlacesData[0];
          //     this.storePlacesData[0] = res.data[0];
          //   }
          // } else {
          this.storePlacesData = res.data;
          this.dataCount = res.dataCount;
          // }
          if (res.data?.length > 0) {
            this.storePlaceId = this.storePlacesData[0].id;
            this.imageSource = this.storePlacesData[0].imageURL;
            this.storePlaceDesc = this.storePlacesData[0].notes;
            this.storePlaceName = this.storePlacesData[0].name;
            this.pagesCount = res.pageCount;
          }
        },
      });
  }

  selectStore(store: any) {
    this.imageSource = store.imageURL;
    this.storePlaceDesc = store.notes;
    this.storePlaceName = store.name;
    this.storePlaceId = store.id;
    this.storePlaceRoute = `/store-places-details/${this.storePlaceId}`;
  }

  onSelectStoreTypeId(id: any) {
    this.counter = 0;
    this.storeTypeId = id;
    this.getAllStorePlaces('next');
  }

  navigateToStorePlacePage() {
    this._router.navigateByUrl('home/store-places-details');
  }
}
