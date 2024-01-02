import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Requirement } from '../../models/requirement';
import { RequirementService } from '../../services/requirement.service';
import { MobileFormatPipe } from '../../../../shared/pipes/mobile-format.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { BudgetPanelComponent } from '../../components/budget-panel/budget-panel.component';

@Component({
  selector: 'app-requirement-entry',
  standalone: true,
  // TODO import ReactiveFormsModule
  imports: [RouterLink, ReactiveFormsModule, CommonModule, MobileFormatPipe, FormsModule, BudgetPanelComponent],
  templateUrl: './requirement-entry.component.html',
  styleUrl: './requirement-entry.component.css',
})
export default class RequirementEntryComponent {
  reqService = inject(RequirementService);

  // * master data
  reqs: Requirement[] = [];

  // * filter data
  filtered = this.reqs;

  isSmallTable = false;

  // TODO new searchBox
  searchBox = new FormControl<string>('', { nonNullable: true });

  constructor() {
    this.reqService.list().subscribe((data) => {
      this.reqs = data;
      this.filtered = this.reqs;
    });

    // ถ้ามีการเปลี่ยนค่า
    this.searchBox
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(v => console.log(v))
      )
      .subscribe(keyword => {
        // ให้ทำอะไร ?
        this.filtered = this.reqs.filter(req => req.title.includes(keyword))
      })

  }
}
