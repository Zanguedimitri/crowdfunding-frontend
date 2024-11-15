import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../models/project.model';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';
import { SharedServicesService } from '../services/shared-services.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule,ProgressBarComponent],

  template: `
    <div class="card" *ngIf="project" >
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
      <div>
        <app-progress-bar [raised] ='project.raised || 0'  [goal] = 'project.goal || 0' >  </app-progress-bar>
        <button class="button" (click)="fundProject()" (click)="sendId(project._id || 0)" >
          Fund this project
        </button>
      </div>
    </div>
  `,
})
export class ProjectCardComponent {

  constructor(private sharedService: SharedServicesService,){}

  @Input() project: Project | null = null;
  @Output() onFund = new EventEmitter<Project>();



  fundProject() {
    if (this.project) {
      this.onFund.emit(this.project);
    }
  }
  sendId(id:number) {
    console.log(id);
    this.sharedService.changeId(id);
  }

}
