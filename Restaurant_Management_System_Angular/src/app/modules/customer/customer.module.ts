import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZoroImportsModule } from '../../NgZoroImportsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/dashboard/dashboard.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZoroImportsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
