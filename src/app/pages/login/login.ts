import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../../services/Authservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
   username = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService,
    private router: Router
  ) {}

  async onLogin() {
     console.log("Trying login with:", this.username, this.password);
    const success = await this.auth.login(this.username, this.password);
    if (success) {
      console.log('✅ Login successful');
     this.router.navigate(['/transactions/dashboard']);
      
    } else {
      console.log("test not success")
      this.errorMsg = '❌ Invalid username or password';
    }
  }

}
