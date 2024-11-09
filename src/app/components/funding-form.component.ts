import { Project } from './../models/project.model';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedServicesService } from '../services/shared-services.service';
import { ProjectService } from '../services/project.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-funding-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ToastModule],
  providers: [MessageService],
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
      <p-toast />
      <button class="button" (click)="submitFunding()" [disabled]="amount < 0">
        Contribute
      </button>
    </div>
  `
})
export class FundingFormComponent implements OnInit {  

  constructor(private sharedService: SharedServicesService,private projectService:ProjectService,private messageService: MessageService){}

  @Input() project: Project | null = null;
  @Output() onSubmit = new EventEmitter<{ project: Project; amount: number }>();
  amount: number = 0;

  project_id!:number

  submitFunding() {
    if (this.project && this.project.raised !== undefined && this.project.goal !== undefined) {   // Vérification complète


      const endRaised = this.project.raised + this.amount;
  
      if (endRaised >= this.project.goal) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Congratulations! You have successfully reached the donation goal.' });
  
          
          this.projectService.updateProject(this.project_id, { raised: this.project.goal }).subscribe({
              next: (value) => {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Donation successful' });
              },
              error: (error) => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Donation failed' });
                  console.error('Erreur lors de la mise à jour du projet:', error);
              }
          });
      } else {
          this.onSubmit.emit({ project: this.project, amount: this.amount });
          
         
          this.projectService.updateProject(this.project_id, { raised: endRaised }).subscribe({
              next: (value) => {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Donation successful' });
              },
              error: (error) => {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Donation failed' });
                  console.error('Erreur lors de la mise à jour du projet:', error);
              }
          });
      }
    } 
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid project data' });
      }
    
  }

  
   ngOnInit() {
    this.sharedService.currentId.subscribe((id) => {
      this.project_id = id;  
    });
  }

}
