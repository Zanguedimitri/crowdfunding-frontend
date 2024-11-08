import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="progress-bar">
      <div 
        class="progress-bar-fill"
        [style.width.%]="goal > 0 ? (raised / goal) * 100 : 0">
      </div>
    </div>
    <div class='progress-bar-pourcent'>
      {{ raised }} raised of {{ goal }} goal
      ({{ goal > 0 ? ((raised / goal) * 100).toFixed(2) : 0 }}%)
    </div>
  `,
 
})
export class ProgressBarComponent {
  @Input() raised = 0;
  @Input() goal = 0;
}
