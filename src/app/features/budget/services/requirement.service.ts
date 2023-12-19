import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Requirement } from '../models/requirement';
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
    return this.httpClient.get<Requirement[]>(this.url);
  }

}
