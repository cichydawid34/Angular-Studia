import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userForm: FormGroup;
  isPostSuccessful: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    console.log('xd');
    if (this.userForm.valid) {
      const projectData = {
        login: this.userForm.value.login,
        password: this.userForm.value.password,
      };
      console.log(projectData);
      this.http
        .post('https://localhost:7240/api/users/login', projectData)
        .subscribe(
          (response: any) => {
            console.log('Post successful:', response);
            this.isPostSuccessful = true;

            localStorage.setItem('userLogin', response.login);
            window.location.reload();
          },
          (error) => {
            console.error('Post error:', error);
          }
        );
    }
  }
}
