import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isPostSuccessful: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      const functionalityData = {
        Login: this.registerForm.value.login,
        Password: this.registerForm.value.password,
      };

      this.http
        .post(`https://localhost:7240/api/Users`, functionalityData)
        .subscribe(
          (response) => {
            console.log('Post successful:', response);
            this.isPostSuccessful = true;
          },
          (error) => {
            console.error('Post error:', error);
            // Handle the error here
          }
        );
    }
  }
}
