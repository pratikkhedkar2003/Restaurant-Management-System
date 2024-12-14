import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {

  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  Products: any = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';

  constructor(
    private adminService: AdminService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    });
    this.getAllProductsByCategory();
  }

  getAllProductsByCategory() {
    this.Products = [];
    this.adminService.getAllProductsByCategory(this.categoryId).subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
      });
    })
  }

  submitForm() {
    this.Products = [];
    this.adminService.getAllProductsByCategoryAndTitle(this.categoryId, this.validateForm.get('title')!.value).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
      })
    })

  }

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe((res) => {
      if (res == null) {
        this.getAllProductsByCategory();
        this.message.success('Product Deleted Successfully', { nzDuration: 5000 });
      } else {
        this.message.error('Something went wrong', { nzDuration: 5000 });
      }
    });
  }

}
