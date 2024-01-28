import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export default class LoginComponent {

  router = inject(Router)
  route = inject(ActivatedRoute)
  fb = inject(NonNullableFormBuilder)

  authService = inject(AuthService)

  email = this.fb.control('admin2@test.com')
  password = this.fb.control('bestPassw0rd')

  fg = this.fb.group({
    email: this.email,
    password: this.password
  })

  errorMessage = '';

  onLogin(): void {
    this.authService.login(this.fg.getRawValue()).subscribe({
      next: (v) => {
        this.authService.setLoggedInUser(v);

        // if (this.route.snapshot.queryParamMap.get('returnUrl')) {
        //   returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
        // } else {
        //   returnUrl = '/'
        // }
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigate([returnUrl]);
      },
      error: (e) => {
        console.log('e', e)
        this.errorMessage = e.error;
      },
    });
  }
}
