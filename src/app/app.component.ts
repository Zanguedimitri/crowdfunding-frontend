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

  constructor(private fb: FormBuilder) {}

  private projectService= Inject(ProjectService)

  projects: Project[] = [
    {
      id: 1,
      title: 'Eco-Friendly Water Bottle',
      description: 'A sustainable water bottle made from recycled materials.',
      goal: 10000,
      raised: 4500
    },
    {
      id: 2,
      title: 'Community Garden',
      description: 'Creating a sustainable garden for the local community.',
      goal: 5000,
      raised: 1750
    },
    {
      id: 3,
      title: 'Educational App',
      description: 'An app to help children learn programming basics.',
      goal: 15000,
      raised: 9000
    }
  ];

  selectedProject: Project | null = null;

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  fundProject(event: { project: Project; amount: number }) {
    const projectIndex = this.projects.findIndex(p => p.id === event.project.id);
    const project = this.projects[projectIndex];
  
    if (project) {
      this.projects[projectIndex] = {
        ...project,
        raised: project.raised || 0 + event.amount
      };
      this.selectedProject = null;
    }
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

 
  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal: [0, [Validators.required, Validators.min(1)]],
    });
  }
  onSubmit() {
    console.log(this.projectForm.value)
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      this.projectService.addProject(projectData).subscribe(
      /*  response => {
          console.log('Projet créé avec succès:', response);
          this.projectForm.reset();
        },,
        error => {
          console.error('Erreur lors de la création du projet:', error);
        }*/
      );
    }
  
}}