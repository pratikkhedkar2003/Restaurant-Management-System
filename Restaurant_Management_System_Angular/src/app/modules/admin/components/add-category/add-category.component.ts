import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  categoryForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router, 
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  postCategory(){
    console.log(this.categoryForm.value);
    const formdata: FormData= new FormData();
    formdata.append("img", this.selectedFile);
    formdata.append("name", this.categoryForm.get("name").value);
    formdata.append("description", this.categoryForm.get("description").value);
    this.adminService.postCtegory(formdata).subscribe(
      (res) => {
        console.log(res);
        if(res.id != null){
          this.message.success("Category posted successfully", { nzDuration: 5000 });
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
