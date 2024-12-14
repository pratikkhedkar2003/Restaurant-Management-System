import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinning: boolean;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  login(){
    this.authService.logIn(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if(res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole
        }
        console.log(user);
        StorageService.saveToken(res.jwt);
        StorageService.saveUser(user);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("admin/dashboard");
        } else if (StorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl("customer/dashboard");
        } else {
          this.notification.error("ERROR", "Bad credentials", { nzDuration: 5000 });
        }
      } else {
        this.notification.error("ERROR", "Bad credentials", { nzDuration: 5000 });
      }
    }, error => {
      this.notification.error("ERROR", "Invalid email or password", { nzDuration: 5000 });
    })
  }

}
