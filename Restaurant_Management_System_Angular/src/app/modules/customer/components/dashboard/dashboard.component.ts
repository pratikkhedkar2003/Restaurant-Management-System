import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerService } from '../../service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class CustomerDashboardComponent {

  categories: any = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean;

  constructor(
    private customerService: CustomerService,
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
    this.customerService.getAllCategoriesByTitle(this.validateForm.get(['title'])!.value).subscribe((res) => {
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
    this.customerService.getAllCategories().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      })
    })
  }

}
