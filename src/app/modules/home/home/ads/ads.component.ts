import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from 'src/app/modules/home/services/ads.service';
import { Ads } from '../../interfaces/ads.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
})
export class AdsComponent implements OnInit {
  adsData: Ads[] = [];
  firstAd: any;
  cityID : number  = Number(localStorage.getItem('cityID'))
  noImagePanner :string = '../../../../../assets/images/bannerImg(notfound).jpg'
  constructor(private _adsService: AdsService, private _router: Router) {}

  ngOnInit(): void {
    this._adsService.getAllAdsense(undefined, undefined, undefined, this.cityID).subscribe({
      next: (res: any) => {
        //debugger
        this.firstAd = res.data[0];
        this.adsData = res.data;
        // let url = 'http://faster001-001-site1.atempurl.com/images/05142023131455download.jpg'
        // this.isImageUrlValid(url).then((isValid) => {
        //   console.log(`Image URL 1 is valid: ${isValid}`); // true
        // });
        for (let i = 0; i < this.adsData.length; i++) {
          this.isImageUrlValid(this.adsData[i].imageURL).then((isValid) => {
            this.adsData[i].isValidURL = isValid 
          });
          
        //  let imageUrlArr = this.adsData[i].imageURL.split('/images')
        //  let replacedUrl = this.adsData[i].imageURL.replace(imageUrlArr[0], environment.apiUrl) 
        //  this.adsData[i].imageURL = replacedUrl
         
        }
        console.log("ads=====> ", this.adsData);
        
        this.adsData.shift();
      },
    });
  }

  isImageUrlValid(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  goToStoreOrItemDetails(ad: Ads) {
    // when ad is item
    if (ad.itemsID)
      this._router.navigate([
        `home/store-places-details/${ad.storesID}`,
      ],{
        queryParams : {
          catId:ad.catID,
        }
      });
    // when ad is store
    else this._router.navigate([`home/store-places-details/${ad.storesID}`]);
  }
}
