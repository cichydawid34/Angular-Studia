import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent {
  taskForm: FormGroup;
  isPostSuccessful: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.taskForm.valid) {
      const taskData = {
        name: this.taskForm.value.name,
        functionalityId: this.data.functionalityId,
        description: 'null',
        priority: 'todo',
        state: 'todo',
      };

      this.http.post(`https://localhost:7240/api/Tasks`, taskData).subscribe(
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
