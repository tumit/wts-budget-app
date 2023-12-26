import { Component, inject } from '@angular/core';
import { MobileFormatPipe } from '../../../../shared/pipes/mobile-format.pipe';
import { Requirement } from '../../models/requirement';
import { RequirementService } from '../../services/requirement.service';

@Component({
  selector: 'app-requirement-approval',
  standalone: true,
  imports: [MobileFormatPipe],
  templateUrl: './requirement-approval.component.html',
  styleUrl: './requirement-approval.component.css',
})
export default class RequirementApprovalComponent {
  reqService = inject(RequirementService);

  reqs: Requirement[] = [];

  constructor() {
    this.loadRequirements();
  }

  private loadRequirements(): void {
    this.reqService.list().subscribe((data) => {
      this.reqs = data;
    });
  }

  onApprove(id: number): void {
    // refresh UI
    // this.reqService.approve(id).subscribe(() => this.loadRequirements())

    // partial update UI
    this.reqService.approve(id).subscribe((v) => {
      this.reqs = this.reqs.map((req) =>
        req.id === id ? { ...req, status: v.status } : { ...req }
      );
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
