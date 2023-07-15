import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-functionality-add',
  templateUrl: './functionality-add.component.html',
  styleUrls: ['./functionality-add.component.scss'],
})
export class FunctionalityAddComponent {
  functionalityForm: FormGroup;
  isPostSuccessful: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.functionalityForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.functionalityForm.valid) {
      const functionalityData = {
        name: this.functionalityForm.value.name,
        projectId: this.data.projectId,
        priority: 'todo',
        state: 'todo',
      };

      this.http
        .post(`https://localhost:7240/api/Functions`, functionalityData)
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
