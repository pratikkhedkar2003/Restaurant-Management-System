import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/dashboard/dashboard.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';

const routes: Routes = [
  { path: "dashboard", component: CustomerDashboardComponent },
  { path: ":categoryId/products", component: ViewProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
