import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  productForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router, 
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  postProduct() {
    console.log(this.productForm.value);
    const formdata: FormData= new FormData();
    formdata.append("img", this.selectedFile);
    formdata.append("name", this.productForm.get("name").value);
    formdata.append("price", this.productForm.get("price").value);
    formdata.append("description", this.productForm.get("description").value);
    this.adminService.postProduct(this.categoryId ,formdata).subscribe(
      (res) => {
        console.log(res);
        if(res.id != null){
          this.message.success("Product posted successfully", { nzDuration: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.message.error("Something went wrong", { nzDuration: 5000 });
        }
      }, error => {
        this.message.error("Something went wrong", { nzDuration: 5000 });
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
