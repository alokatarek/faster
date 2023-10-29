import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { NaveSideBarComponent } from './components/nave-side-bar/nave-side-bar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [NaveSideBarComponent, SpinnerComponent],
  imports: [
    // modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    SharedRoutingModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    // modules
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,

    CarouselModule,

    //component
    NaveSideBarComponent,
    SpinnerComponent,
    MatProgressSpinnerModule,
    AutocompleteLibModule,
  ],
})
export class SharedModule {}
