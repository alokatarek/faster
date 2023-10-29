import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StoreType } from '../../interfaces/store-type.interface';
import { StorePlacesService } from '../../services/store-places.service';
import { StoreTypesService } from '../../services/store-types.service';

@Component({
  selector: 'app-store-types',
  templateUrl: './store-types.component.html',
  styleUrls: ['./store-types.component.css'],
})
export class StoreTypesComponent implements OnInit {
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
  noImageStore: string =
    '../../../../../assets/images/storeImage(notfound).jpg';

  storeTypeData: StoreType[] = [];
  counter = 0;
  pagesCount: number = 0;
  // storeTypeId: number = 0;
  @Output() storeTypeId = new EventEmitter<number>();
  firstStoreTypeId: number = 0;
  isFirstCallApi = false;
  constructor(private _storeTypesService: StoreTypesService) {}
  ngOnInit(): void {
    this.isFirstCallApi = true;
    this.getAllStoreTypes('next');
  }

  getAllStoreTypes(buttonType: string) {
    if (buttonType === 'next') {
      this.counter = this.counter + 1;
    } else {
      this.counter = this.counter - 1;
    }
    if (this.counter < 1) this.counter = this.pagesCount;
    if (this.counter > this.pagesCount) this.counter = 1;

    this._storeTypesService.getAllStoreType(1, 100).subscribe({
      next: (res: any) => {
        //           this.firstStoreTypeId = res.data[0].id
        // to call selectStoreType when component render without user click on store place
        //  if(this.isFirstCallApi) this.selectStoreType(this.firstStoreTypeId)
        //  this.isFirstCallApi = false

        //   if(res.data.length < 3) {
        //     if(res.data.length === 2){
        //       this.storeTypeData[2] = this.storeTypeData[0]
        //       this.storeTypeData[0] = res.data[0]
        //       this.storeTypeData[1] = res.data[1]

        //     }else if (res.data.length === 1){
        //        this.storeTypeData[2] = this.storeTypeData[0]
        //       this.storeTypeData[0] = res.data[0]
        //     }
        //   }else{
        this.storeTypeData = res.data;
        /***Set First store to be shown be default >> Ali */
        /***** look at first on if not exist select second one >> ..etc untill third ele */
        if (this.storeTypeData.length > 0) {
          this.storeTypeId.emit(
            this.storeTypeData[0].id ||
              this.storeTypeData[1].id ||
              this.storeTypeData[2].id
          );
        }

        //      }
        this.pagesCount = res.pageCount;
      },
    });
  }

  selectStoreType(id: number) {
    this.storeTypeId.emit(id);
  }
}
