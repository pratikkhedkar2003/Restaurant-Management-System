import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean;
  validateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      checkPassword: ["", [Validators.required, this.confirmationValidate]],
      name: ["", Validators.required]
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  signup() {
    this.isSpinning = true;
    console.log(this.validateForm.value);
    this.authService.signUp(this.validateForm.value).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      if (res.id != null) {
        this.notification.success("SUCESS", "You're registerd successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/login");
      } else {
        this.notification.error("ERROR", "Something went wrong", { nzDuration: 5000 });
      }
    }, error => {
      this.isSpinning = false
      this.notification.error("ERROR", "User already exist with this email", { nzDuration: 5000 });
    })
  }

}
