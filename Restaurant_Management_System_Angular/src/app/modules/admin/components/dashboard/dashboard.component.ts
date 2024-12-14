import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboardComponent {

  categories: any = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    });

    this.getAllCategories();
  }

  submitForm() {
    this.isSpinning = true;
    this.categories = [];
    this.adminService.getAllCategoriesByTitle(this.validateForm.get(['title'])!.value).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
        this.isSpinning = false;
      })
    })
  }

  getAllCategories() {
    this.categories = [];
    this.adminService.getAllCategories().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      })
    })
  }

  deleteCategory(categoryId: number) {
    this.adminService.deleteCategory(categoryId).subscribe((res) => {
      if (res == null) {
        this.getAllCategories();
        this.message.success('Category Deleted Successfully', { nzDuration: 5000 });
      } else {
        this.message.error('Something went wrong', { nzDuration: 5000 });
      }
    })
  }

}
