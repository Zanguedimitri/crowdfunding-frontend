import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service'; 

@Component({
  selector: 'app-create-project',
  standalone: true,
  providers: [ProjectService], // Ajouter le service ProjectService dans les provider
  imports:[ReactiveFormsModule],
  template:`
            `

  
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    
  ) {}

  private projectService= Inject(ProjectService)

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal: [0, [Validators.required, Validators.min(1)]],
      raised: ['', [Validators.required, Validators.min(1)]] 
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe(
       /* (response ) => {
          console.log('Projet créé avec succès :', response);
        },
        (error) => {
          console.error('Erreur lors de la création du projet :', error);
        }*/
      );
    }
  }
}
