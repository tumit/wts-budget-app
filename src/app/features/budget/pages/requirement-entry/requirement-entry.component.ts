import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Requirement } from '../../models/requirement';
import { RequirementService } from '../../services/requirement.service';
import { MobileFormatPipe } from '../../../../shared/pipes/mobile-format.pipe';

@Component({
  selector: 'app-requirement-entry',
  standalone: true,
  imports: [CommonModule, MobileFormatPipe],
  templateUrl: './requirement-entry.component.html',
  styleUrl: './requirement-entry.component.css',
})
export default class RequirementEntryComponent {

  reqService = inject(RequirementService);

  // Normal
  reqs: Requirement[] = [];

  // Observable
  // reqs = this.httpClient.get<Requirement[]>('http://localhost:3000/requirements');

  // Signal
  // reqs = toSignal(this.httpClient.get<Requirement[]>('http://localhost:3000/requirements'))

  constructor() {
    this.reqService.list()
      .subscribe((data) => (this.reqs = data));
  }
}
