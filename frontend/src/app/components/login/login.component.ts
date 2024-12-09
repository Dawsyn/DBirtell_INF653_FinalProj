import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  userLogin: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Initialize FormGroup
    this.userLogin = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // For easy access to form controls in the template
  get form() {
    return this.userLogin.controls;
  }

  // Login method
  login() {
    if (this.userLogin.invalid) {
      this.errorMessage = 'Please fill in both fields.';
      return;
    }

    const { username, password } = this.userLogin.value; // Retrieve form values
    this.authService.login(username, password).subscribe({
      next: () => {
        const returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
