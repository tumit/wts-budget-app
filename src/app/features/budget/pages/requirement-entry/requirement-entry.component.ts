import { Component } from '@angular/core';

interface Requirement {
  id: number;
  title: string;
  contactMobileNo: string;
}

@Component({
  selector: 'app-requirement-entry',
  standalone: true,
  imports: [],
  templateUrl: './requirement-entry.component.html',
  styleUrl: './requirement-entry.component.css',
})
export default class RequirementEntryComponent {
  reqs = [
    { id: 1, title: 'Mouse 2 Units', contactMobileNo: '0891234567' },
    { id: 2, title: 'Printer 1 Unit', contactMobileNo: '0881234567' },
  ];

  // reqs: Requirement[] = [];

}
