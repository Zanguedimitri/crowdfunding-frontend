import { Project } from './../models/project.model';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedServicesService } from '../services/shared-services.service';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-funding-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
    <div class="cards" *ngIf="project">
      <h2>Fund <span>{{ project.title }}</span></h2>
      <input
        type="number"
        class="input"
        placeholder="Enter amount"
        [(ngModel)]="amount"
         [ngClass]="{'input-error': amount < 0 }"
      />
      <button class="button" (click)="submitFunding()" [disabled]="amount < 0">
        Contribute
      </button>
    </div>
  `
})
export class FundingFormComponent implements OnInit {  

logo(){
  alert('lsfjksljfklsj')
}
  @Input() project: Project | null = null;
  @Output() onSubmit = new EventEmitter<{ project: Project; amount: number }>();
  amount: number = 0;

  project_id!:number

  submitFunding() {
      
  if (this.project && this.project.raised !== undefined && this.project.goal !== undefined) {   // Vérification complète
    
    this.onSubmit.emit({ project: this.project, amount: this.amount });

    const endRaised = this.project.raised + this.amount;
      
    if (endRaised < this.project.goal) {
        this.projectService.updateProject(this.project_id, { raised: endRaised }).subscribe({
          next: (value) => {
            this.project = value;
            console.log(value)
          },

          error(error) {
            console.error('Erreur lors de la récupération des projets:', error);
          },
        })
    } else {
        alert('You have reached the goal')
    }
}

    
  }

  
  constructor(private sharedService: SharedServicesService,private projectService:ProjectService){}
  ngOnInit() {
    this.sharedService.currentId.subscribe((id) => {
      this.project_id = id;  
    });
  }

}
