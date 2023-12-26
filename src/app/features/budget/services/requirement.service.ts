import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Requirement, RequirementStatus } from '../models/requirement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  url = 'http://localhost:3000/requirements';

  httpClient = inject(HttpClient);

  constructor() { }

  // () => Observable<Requirement[]>
  list(): Observable<Requirement[]> {
    return this.httpClient
      .get<Requirement[]>(this.url);
  }

  // Requirement => Observable<Requirement>
  add(req: Requirement): Observable<Requirement> {
    return this.httpClient
      .post<Requirement>(this.url, req);
  }

  get(id: number): Observable<Requirement> {
    // requirements/:id
    return this.httpClient
      .get<Requirement>(`${this.url}/${id}`);
  }

  edit(req: Requirement, id: number): Observable<Requirement> {
    // requirements/:id
    return this.httpClient
      .put<Requirement>(`${this.url}/${id}`, req);
  }

  approve(id: number): Observable<Requirement> {
    // requirements/:id
    return this.httpClient
      .patch<Requirement>(`${this.url}/${id}`, { status: RequirementStatus.APPROVED });
  }

  reject(id: number): Observable<Requirement> {
    // requirements/:id
    return this.httpClient
      .patch<Requirement>(`${this.url}/${id}`, { status: RequirementStatus.REJECTED });
  }

}
