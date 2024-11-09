import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../models/project.model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


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
export class FundingFormComponent {  



  @Input() project: Project | null = null;
  @Output() onSubmit = new EventEmitter<{ project: Project; amount: number }>();
  amount: number = 0;

  submitFunding() {
      console.log( typeof this.amount)
    if (this.project) {
      this.onSubmit.emit({ project: this.project, amount: this.amount });
    }
  }
}
