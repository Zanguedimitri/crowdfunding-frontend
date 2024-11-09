import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingFormComponent } from './components/funding-form.component';
import { ProjectCardComponent } from './components/project-card.component';
import { Project } from './models/project.model';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProjectService } from './services/project.service';
import { SharedServicesService } from './services/shared-services.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FundingFormComponent,ReactiveFormsModule, ProjectCardComponent,
    RouterModule,DialogModule, ButtonModule,],
  template: `

    
    
    <div class="container">
      <div class="container-header">
        <h1>Crowdfunding Projects</h1>

        <button (click)="showDialog()" > Add new projects </button>
      </div>

      <app-funding-form
        *ngIf="selectedProject"
        [project]="selectedProject"
        (onSubmit)="fundProject($event)">
      </app-funding-form>
      

      <div class="projects">
        <app-project-card 
          *ngFor="let project of projects"
          [project]="project"
          (onFund)="selectProject($event)">
        </app-project-card>
      </div>
      
    </div>
  <p-dialog header="Nouveau projet" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
      <form [formGroup]="projectForm">
                <label for="title">Titre du projet</label>
                <input id="title" formControlName="title" type="text" />

                <label for="description">Description</label>
                <textarea id="description" formControlName="description"></textarea>

                <label for="goal">Objectif financier</label>
                <input id="goal" formControlName="goal" type="number" />
                
        </form>
      <div class="container-button" >
          <p-button label="Cancel" severity="secondary" (onClick)="visible = false"  />
          <button type="submit" [disabled]="projectForm.invalid" (click)="onSubmit()" >Créer le projet</button>
      </div>
  </p-dialog>

  `
})
export class AppComponent {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder, private projectService:ProjectService) {}
  
  projects!: Project[];

  selectedProject: Project | null = null;

  visible: boolean = false;

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  showDialog() {
    this.visible = true;
  }

  fundProject(event: {project: Project, amount: number}) {
    const projectIndex = this.projects.findIndex(p => p._id === event.project._id);
    if (projectIndex === -1) {
      this.projects[projectIndex] = {
        ...this.projects[projectIndex],
        raised: this.projects[projectIndex].raised || 0 + event.amount
      };
      this.selectedProject = null;
    }
  }


  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal: [0, [Validators.required, Validators.min(1)]],
    });

    this.projectService.getProject().subscribe({
      next: (project) => {
        this.projects = project;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    });
  }

  onSubmit() {
   
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      this.projectService.addProject({...projectData}).subscribe({
        next:(value) => {
          console.log('Projet créé avec succès:', value);
          this.projectForm.reset();
        },
        error:(error) => {
          console.error('Erreur lors de la création du projet:', error);
        }
      });
    }
  
}}

