import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FunctionalityAddComponent } from 'src/app/functionality-add/functionality-add.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  projectId: string | null = null;
  project: any;
  functionalities: any;

  isPostSuccessful: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
      // Fetch project details based on the projectId and display them
      console.log('Project ID:', this.projectId);
      this.getProject();
      this.getFunctionalities();
    });
  }
  addForm() {
    let dialogRef = this.dialog.open(FunctionalityAddComponent, {
      height: '400px',
      width: '400px',
      data: { projectId: this.projectId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result from the dialog if needed
      console.log('Dialog result:', result);
      // Refresh the functionalities list after adding a new functionality
      this.getFunctionalities();
    });
  }

  getProject() {
    if (this.projectId) {
      const apiUrl = `https://localhost:7240/api/Projects?id=${this.projectId}`;

      this.http.get(apiUrl).subscribe(
        (response: any) => {
          console.log('Get project successful:', response);
          this.project = response.value;
          // Handle the project data here
        },
        (error) => {
          console.error('Get project error:', error);
          // Handle the error here
        }
      );
    }
  }

  deleteProject() {
    if (this.projectId) {
      const apiUrl = `https://localhost:7240/api/Projects?id=${this.projectId}`;

      this.http.delete(apiUrl).subscribe(
        (response) => {
          console.log('Delete successful:', response);
          // Navigate to a different route after successful deletion
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Delete error:', error);
          // Handle the error here
        }
      );
    }
  }
  getFunctionalities() {
    const apiUrl = `https://localhost:7240/api/Functions/Project/${this.projectId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('Get functionalities successful:', response);
        this.functionalities = response;
        // Handle the project data here
      },
      (error) => {
        console.error('Get functionalities error:', error);
        // Handle the error here
      }
    );
  }
}
