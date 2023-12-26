import { CommonModule, JsonPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  FormGroup,
} from '@angular/forms';
import { RequirementService } from '../../services/requirement.service';
import { ActivatedRoute } from '@angular/router';
import { RequirementStatus } from '../../models/requirement';

function isTHMobile(mobileNo: string): boolean {
  return /^(06|08|09)/.test(mobileNo);
}

const thMobile = (c: AbstractControl): ValidationErrors | null => {
  return isTHMobile(c.getRawValue()) ? null : { thMobile: true };
};

@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './requirement-form.component.html',
  styleUrl: './requirement-form.component.css',
})
export default class RequirementFormComponent {
  // formBuilder
  fb = inject(NonNullableFormBuilder);

  // route
  route = inject(ActivatedRoute)

  // title = new FormControl<string>('', { nonNullable: true })
  title = this.fb.control<string>('', { validators: Validators.required });
  contactMobileNo = this.fb.control<string>('', {
    validators: [Validators.required, thMobile],
  });

  // formGroup
  // { title: string, contactMobileNo: string }
  fg = this.fb.group({
    title: this.title,
    contactMobileNo: this.contactMobileNo,
  });

  id: (number | null) = null;

  constructor() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    // id is has value => edit mode
    if (this.id) {
      // get detail to formGroup
      this.reqService.get(this.id).subscribe(req => this.fg.patchValue(req));
    }
  }

  // requirementService
  reqService = inject(RequirementService);

  onSubmit(): void {
    const submitReq = {...this.fg.getRawValue(), status: RequirementStatus.PENDING};
    if (this.id) {
      this.reqService.edit(submitReq, this.id).subscribe(() => this.onBack());
    } else {
      this.reqService.add(submitReq).subscribe(() => this.onBack());
    }
  }

  // location
  location = inject(Location);

  onBack(): void {
    this.location.back();
  }
}
