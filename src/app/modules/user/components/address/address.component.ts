import { AfterViewChecked, Component, OnInit } from '@angular/core';
// for map
//import * as mapboxgl from 'mapbox-gl';
import { AddressService } from '../../services/address.service';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  // for map

  // map: mapboxgl.Map | undefined;
  // style = 'mapbox://styles/mapbox/streets-v11';
  // lat = 37.75;
  // lng = -122.41;
  // marker: mapboxgl.Marker | undefined;
  // lngLat: mapboxgl.LngLat | undefined;
  cityID: number = 0;
  stateID: number = 0;
  areaID: any;
  stateDropdownData: any;
  cityDropdownData: any = [];
  areaDropdownData: any;
  isCityID: boolean = false;
  isStateID: boolean = false;
  isAreaID: boolean = false;
  isCoordinates: boolean = false;
  isLoading: boolean = false;

  keyword = 'name';

  constructor(
    private _addressService: AddressService,
    private _router: Router
  ) {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position.coords.latitude, position.coords.longitude);
    //   this.lat = position.coords.latitude;
    //   this.lng = position.coords.longitude;
    //   (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    //   this.map = new mapboxgl.Map({
    //     container: 'map',
    //     style: this.style,
    //     zoom: 13,
    //     center: [this.lng, this.lat],
    //   });
    //   this.map.addControl(new mapboxgl.FullscreenControl());
    //   this.map.addControl(new mapboxgl.NavigationControl());
    //   mapboxgl.setRTLTextPlugin(
    //     'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    //     null!,
    //     true // Lazy load the plugin
    //   );
    //   // Add map controls
    //   // this.map.addControl(new mapboxgl.NavigationControl());
    //   // Set marker options.
    //   this.marker = new mapboxgl.Marker({
    //     draggable: true,
    //   })
    //     .setLngLat([this.lng, this.lat])
    //     .addTo(this.map!);
    // });
  }

  // ngAfterViewChecked(): void {
  //   this.onDragEnd();
  //   // this.marker?.on('dragend', this.onDragEnd());
  // }
  // ngAfterContentInit(): void {
  //   this.onDragEnd()

  // }
  // onDragEnd() {
  //   this.lngLat = this.marker?.getLngLat()!;
  //   if (this.lngLat) this.isCoordinates = true;

  //   localStorage.setItem('coordinatesOfMap', JSON.stringify(this.lngLat));
  // }

  // for form

  ngOnInit(): void {
    this.getStateDropdown();
  }
  getAreaDropdown() {
    this.isLoading = true;
    this._addressService
      .getDropDownListAreas(this.cityID)
      .pipe(
        tap(() => {
          this.isLoading = false;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.areaDropdownData = res.data;
        },
      });
  }

  getStateDropdown() {
    console.log('in state');
    debugger;

    this.isLoading = true;
    this._addressService
      .getDropDownListStates()
      .pipe(
        tap(() => {
          this.isLoading = false;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.stateDropdownData = res.data;
        },
      });
  }
  getCityDropdown() {
    this.isLoading = true;
    this._addressService
      .getDropDownListCities(this.stateID)
      .pipe(
        tap(() => {
          this.isLoading = false;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.cityDropdownData = res.data;
          if (res.data.length > 0) this.isCityID = true;
        },
      });
  }
  setStateID(stateValueSelected: any) {
    this.stateID = stateValueSelected.value;
    this.isStateID = true;
    this.getCityDropdown();
  }
  setCityID(cityValueSelected: any) {
    localStorage.setItem('cityID', cityValueSelected.value.toString());
    this.cityID = cityValueSelected.value;
    this.getAreaDropdown();
  }

  // setAreaID(areaValueSelected: any) {
  //   this.areaID = areaValueSelected.value;
  //   //  to save areaID and send it when user make checkout
  //   localStorage.setItem('areaID', areaValueSelected.value.toString());
  //   this.isAreaID = true;
  // }

  navigateToHomePage() {
    this._router.navigate(['/home']);
  }

  /******  Drop Down with filter >> Ali  */

  selectEvent(areaValueSelected: any) {
    // do something with selected item

    console.log(areaValueSelected, 'areaSelect');

    this.areaID = areaValueSelected.id;
    //  to save areaID and send it when user make checkout
    localStorage.setItem('areaID', areaValueSelected.id.toString());
    this.isAreaID = true;
  }

  clearInput(e: any) {
    console.log(e, 'clear');

    if (e == undefined) {
      localStorage.removeItem('areaID');
      this.isAreaID = false;
    } else {
      return;
    }
  }

  /******* filter when i type into input */
  customFilter = function (items: any[], query: string): any[] {
    console.log(items, query);

    //return countries.filter((x) => x.name.startsWith(query));

    return items
      .filter((item) => item.name.toString().includes(query))
      .reverse();
  };
}
