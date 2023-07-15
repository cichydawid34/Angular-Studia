import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddComponent } from './task-add/task-add.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks: any;
  projectId: any;
  todo: any;
  done: any;
  doing: any;
  functionalityId: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.functionalityId = params['id'];
      // Fetch project details based on the projectId and display them
      console.log('Functionality ID:', this.functionalityId);

      this.getTasks();
    });
  }
  addForm() {
    let dialogRef = this.dialog.open(TaskAddComponent, {
      height: '400px',
      width: '400px',
      data: { functionalityId: this.functionalityId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result from the dialog if needed
      console.log('Dialog result:', result);
      // Refresh the functionalities list after adding a new functionality
      this.getTasks();
    });
  }
  getTasks() {
    const apiUrl = `https://localhost:7240/api/Tasks/Functionality/${this.projectId}?functionalityId=${this.functionalityId}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('Get Tasks successful:', response);
        this.tasks = response;
        this.todo = this.tasks.filter((task: any) => task.state === 'todo');
        this.done = this.tasks.filter((task: any) => task.state === 'done');
        this.doing = this.tasks.filter((task: any) => task.state === 'doing');
        console.log(this.todo);
      },
      (error) => {
        console.error('Get tasks error:', error);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let droppedTask: any = event.container.data[event.currentIndex];

      console.log('task');
      console.log(droppedTask);
      console.log(event.container.id);
      if (event.container.id == 'cdk-drop-list-0') {
        droppedTask.State = 'todo';
      } else if (event.container.id == 'cdk-drop-list-1') {
        droppedTask.State = 'doing';
      } else if (event.container.id == 'cdk-drop-list-2') {
        droppedTask.State = 'done';
      }
      const apiUrl = `https://localhost:7240/api/Tasks/edit`;
      this.http.post(apiUrl, droppedTask).subscribe(
        (response: any) => {
          console.log('Task state update successful:', response);
        },
        (error) => {
          console.error('Task state update error:', error);
        }
      );
    }
  }
}
