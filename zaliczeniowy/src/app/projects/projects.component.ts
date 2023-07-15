import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyDataService } from '../services/my-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddComponent } from '../projects/project-add/project-add.component';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  myData$: any;
  Data$: any;
  constructor(
    private myDataService: MyDataService,
    private dialog: MatDialog
  ) {}

  addForm() {
    let dialogRef = this.dialog.open(ProjectAddComponent, {
      height: '400px',
      width: '400px',
    });
  }
  ngOnInit(): void {
    this.myData$ = this.myDataService.getData();
    this.myData$.subscribe((response: any) => {
      this.Data$ = response.value;
      console.log(this.Data$);
    });
  }
}
