import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  passwordMismatch(): boolean {
    return (
      !!this.user.password && 
      !!this.user.confirmPassword && 
      this.user.password !== this.user.confirmPassword
    );
  }

  reg() {
    if (!this.passwordMismatch()) {
      // Proceed with registration logic
      console.log('User registered successfully', this.user);
    } else {
      console.error('Passwords do not match.');
    }
  }

}
