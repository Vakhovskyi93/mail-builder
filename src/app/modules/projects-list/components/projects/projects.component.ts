import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { IProjectData } from 'src/app/repository/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() form!: FormControl;
  @Input() index!: number;
  @Input() item!: any;

  @Output() emailUpdate: EventEmitter<any> = new EventEmitter<any>();

  projectsListView = false;
  updateEmail(index: number, email: string) {
    this.emailUpdate.emit(index);
  }
}
