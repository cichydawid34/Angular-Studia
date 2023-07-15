import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
})
export class ProjectAddComponent {
  projectForm: FormGroup;
  isPostSuccessful: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.projectForm.valid) {
      const projectData = {
        name: this.projectForm.value.name,
        description: this.projectForm.value.description,
      };

      this.http
        .post('https://localhost:7240/api/projects', projectData)
        .subscribe(
          (response) => {
            console.log('Post successful:', response);
            this.isPostSuccessful = true;
            window.location.reload();
          },
          (error) => {
            console.error('Post error:', error);
            // Handle the error here
          }
        );
    }
  }
}
