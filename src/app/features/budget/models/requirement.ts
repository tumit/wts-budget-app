export enum RequirementStatus {
  APPROVED = 'APPROVED', REJECTED = 'REJECTED', PENDING = 'PENDING'
}

export interface Requirement {
  id?: number;
  title: string;
  contactMobileNo: string;
  status: RequirementStatus;
  budget: number;
}