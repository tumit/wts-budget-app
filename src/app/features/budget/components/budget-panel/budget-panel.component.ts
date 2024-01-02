import { CommonModule } from '@angular/common';
import { Component, Input, effect, inject } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget-panel.component.html',
  styleUrl: './budget-panel.component.css',
})
export class BudgetPanelComponent {

  @Input()
  editable = false;

  // budget
  budgetService = inject(BudgetService)
  budgetState = this.budgetService.budgetState;
  balanceState = this.budgetService.balanceState;

  // reactive-form
  fb = inject(NonNullableFormBuilder)
  baseUsedPct = this.fb.control<number>(0)

  constructor() {
    // load total
    this.budgetService.load();

    // update baseUsed when change percent on radio button
    this.baseUsedPct
      .valueChanges
      .subscribe(v => {
        this.budgetService.updateBaseUsed(v);
      })

    effect(() => {

    })
  }

}
