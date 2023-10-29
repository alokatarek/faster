import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { OrdersService } from '../../services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


export interface userData {
  userName : string,
  fullName : string
}

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})


export class ShippingComponent implements OnInit {
  SubmitForm : any = {}
  stateDropdownData: any;
  cityDropdownDataFrom: any;
  areaDropdownDataFrom: any;
  cityDropdownDataTo: any;
  areaDropdownDataTo: any;
  vehicleTypesList : any;
  submittingObject :object = {}
  userData : userData = JSON.parse(localStorage.getItem('userData') || '')
  constructor(private fb: FormBuilder,
      private _addressService:AddressService, 
      private _ordersService : OrdersService,
      private _snackBar: MatSnackBar,
      private _router: Router) { }

  shippingForm = this.fb.group({
    name : [this.userData.fullName, Validators.required],
    phoneNumber : ['', Validators.required],
    shipFrom : this.fb.group({
      governorate : ['', Validators.required],
      city : [{value : '', disabled : true}, Validators.required],
      area : [{value : '', disabled : true}, Validators.required]
    }),
    shipTo :  this.fb.group({
      governorate : ['', Validators.required],
      city : [{value : '', disabled : true}, Validators.required],
      area : [{value : '', disabled : true}, Validators.required]
    }),
    shipSize : this.fb.group({
      length : ['', Validators.required],
      width : ['', Validators.required],
      height : ['', Validators.required]
    }),
    shippmentDesc : ['', Validators.required],
    transportationVehicle : ['']
  });

  getStateDropdown() {
    this._addressService.getDropDownListStates().subscribe({
      next: (res) => {
        this.stateDropdownData = res.data;

      },
    });
  }

  getAreaDropdown(status:string) {
    if (status === "from") {
      this._addressService.getDropDownListAreas(this.shippingForm.get('shipFrom')?.value.city).subscribe({
        next: (res) => {
          this.areaDropdownDataFrom = res.data;
        },
      });
    } else {
      this._addressService.getDropDownListAreas(this.shippingForm.get('shipTo')?.value.city).subscribe({
        next: (res) => {
          this.areaDropdownDataTo = res.data;
        },
      });
    }
  
  }
  
  getCityDropdown(status:string) {
    if (status === "from") {
      this._addressService.getDropDownListCities(this.shippingForm.get('shipFrom')?.value.governorate).subscribe({
        next: (res) => {
          this.cityDropdownDataFrom = res.data
          // if(res.data.length > 0) this.isCityID = true
        },
      });
    } else {
      this._addressService.getDropDownListCities(this.shippingForm.get('shipTo')?.value.governorate).subscribe({
        next: (res) => {
          this.cityDropdownDataTo = res.data
          // if(res.data.length > 0) this.isCityID = true
        },
      });
    }
    
  }


  onSelectionGovernorate (event:any, status:string) {
    debugger
    if (status === "from") {
      if ( this.shippingForm.get('shipFrom')?.value.governorate) {
        this.shippingForm.get('shipFrom')?.get('city')?.enable()
      } else {
        this.shippingForm.get('shipFrom')?.get('city')?.disable()
      }
      this.getCityDropdown(status)
    } else {
      if ( this.shippingForm.get('shipTo')?.value.governorate) {
        this.shippingForm.get('shipTo')?.get('city')?.enable()
      } else {
        this.shippingForm.get('shipTo')?.get('city')?.disable()
      }
      this.getCityDropdown(status)
    }
  }

  onSelectionCity (event:any, status:string) {
    if (status === "from") {
      if ( this.shippingForm.get('shipFrom')?.value.city) {
        this.shippingForm.get('shipFrom')?.get('area')?.enable()
      } else {
        this.shippingForm.get('shipFrom')?.get('area')?.disable()
      }
      this.getAreaDropdown(status)
    } else {
      if ( this.shippingForm.get('shipTo')?.value.city) {
        this.shippingForm.get('shipTo')?.get('area')?.enable()
      } else {
        this.shippingForm.get('shipTo')?.get('area')?.disable()
      }
      this.getAreaDropdown(status)
    }
  }

  // get all Vehicles types 
  getAllVehicleTypes () {
    this._ordersService.getDropDownListVehiclesTypes().subscribe({
      next: (res) => {
        this.vehicleTypesList = res.data
        console.log('this.vehicleTypesList : ', this.vehicleTypesList);
        
      },
    });
  }

  onSubmit() {
    this.submittingObject = {
      "customerId": localStorage.getItem('userId'),
      "areasFromId": this.shippingForm.value.shipFrom.area,
      "areaToId": this.shippingForm.value.shipTo.area,
      "customerPhone": this.shippingForm.value.phoneNumber,
      "customerName": this.shippingForm.value.name,
      "lengthOfShipment": this.shippingForm.value.shipSize.length,
      "heightOfShipment": this.shippingForm.value.shipSize.height,
      "widthOfShipment": this.shippingForm.value.shipSize.width,
      "shipmentDesc": this.shippingForm.value.shippmentDesc,
      "vehiclesTypesId": this.shippingForm.value.transportationVehicle,
      "notes": ''
    }
    debugger
    if (this.shippingForm.valid) {
      
      this._ordersService.addShipmentOrder(this.submittingObject).subscribe({
        next:(res:any)=>{
          
          this.shippingForm.reset()
          this.shippingForm.clearValidators()
          for (const key in this.shippingForm.controls) {
            this.shippingForm.get(key)?.clearValidators();
            this.shippingForm.get(key)?.updateValueAndValidity();
        }
          this._snackBar.open("تم ارسال الشحنة بنجاح و في انتظار الموافقة من الادارة",
            'x',
            {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
              panelClass: ['toast-success'],
            }
          );
      
        },error:(err)=>{
          this._snackBar.open(" حدث خطأ ولم يتم الارسال !",
          'x',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['toast-failed'],
          }
        );
    
        }
      })
      this._router.navigate(['user/orders']);
      // console.log("Form Submitted! and value is : ", this.shippingForm.value);
      // this.shippingForm.reset();  reset after submit
    }
  }

  ngOnInit(): void {
    this.getStateDropdown()
    this.getAllVehicleTypes()
  }

}
