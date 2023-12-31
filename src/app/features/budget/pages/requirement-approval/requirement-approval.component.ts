import { Component, effect, inject } from '@angular/core';
import { MobileFormatPipe } from '../../../../shared/pipes/mobile-format.pipe';
import { Requirement, RequirementStatus } from '../../models/requirement';
import { RequirementService } from '../../services/requirement.service';
import { BudgetPanelComponent } from '../../components/budget-panel/budget-panel.component';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-requirement-approval',
  standalone: true,
  imports: [MobileFormatPipe, BudgetPanelComponent],
  templateUrl: './requirement-approval.component.html',
  styleUrl: './requirement-approval.component.css',
})
export default class RequirementApprovalComponent {
  reqService = inject(RequirementService);
  budgetService = inject(BudgetService)

  reqs: Requirement[] = [];

  disableMoreApprove = false

  constructor() {
    this.loadRequirements();

    effect(() => {
      this.disableMoreApprove = this.budgetService.balanceState() <= 0
    })
  }

  private loadRequirements(): void {
    this.reqService.list().subscribe((data) => {
      this.reqs = data;
      this.updateUsed();
    });
  }


  // list => single
  // number[] => number

  // 1, 2, 3, 4
  // reduce by init-value 0
    // 1. fn (previous: number, current: number) => number
    // 2. init value: 0
  // 1. 0=>previous, 1=current => return 0+1 = 1
  // 2. 1=>previous, 2=current => return 1+2 = 3
  // 3. 3=>previous
  private updateUsed(): void {

      // filter APPROVED Only
      const approvedList = this.reqs
        .filter(req => req.status === RequirementStatus.APPROVED);

      // budget of approved list
      const budgetList = approvedList.map(req => req.budget);

      // sum budgetList
      const sumBudget = budgetList.reduce(
        (previous, current) => { return previous + current },
        0
      );

      // const used = this.reqs
      //   .filter(req => req.status === RequirementStatus.APPROVED)
      //   .map(req => req.budget)
      //   .reduce((p, c) => p + c ,0);

      this.budgetService.updateUsed(sumBudget)
  }

  onApprove(id: number): void {
    // refresh UI
    // this.reqService.approve(id).subscribe(() => this.loadRequirements())

    // partial update UI
    this.reqService.approve(id).subscribe((v) => {
      this.reqs = this.reqs.map((req) =>
        req.id === id ? { ...req, status: v.status } : { ...req }
      );
      this.updateUsed();
    });
  }

  onReject(id: number): void {
    // partial update UI
    this.reqService.reject(id).subscribe((updated) => {

      // [1, 2, 3].map(v => v+1) => [2, 3, 4]
      // update match id only
      // [r1, r2, r3].map(r => updateStatus(r.id)):Requirement
      // => [r1(withOldStatus), r2(withNewStatus), r3(withOldStatus)]
      this.reqs = this.reqs.map(req => {
        // update match id
        if (req.id === id) {
          // with new status
          return {...req, status: updated.status}
        } else {
          // with old status
          return req
        }
      });

      this.updateUsed();

      // this.reqs = this.reqs.map(req => {
      //   return (req.id === id)
      //     ? {...req, status: updated.status}
      //     : req
      // })

      // this.reqs = this.reqs.map(req => req.id === id
      //   ? {...req, status: updated.status}
      //   : req);


    });
  }

}
