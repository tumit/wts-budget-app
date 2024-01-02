import { Injectable, computed, inject, signal } from '@angular/core';
import { Budget } from '../models/budget';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  // 1. s()
  // 2. s.set(newValue)
  // 3. s.update(oldValue => do-something)
  // 4. computed

  budgetState = signal<Budget>({
    total: 0,
    baseUsed: 0,
    used: 0,
    balance: 0
  })

  balanceState = computed(() => {
    return this.budgetState().total
      - this.budgetState().baseUsed
      - this.budgetState().used
  })

  httpClient = inject(HttpClient)

  load(): void {
    const url = 'http://localhost:3000/budget';
    this.httpClient
      .get<{ total: number }>(url)
      .subscribe(v => {
        this.budgetState.update(state => {
          return {...state, total: v.total }
        })
      });
  }

  updateBaseUsed(pct: number): void {
    this.budgetState.update(state => {
      const baseUsed = state.total * pct / 100;
      return {...state, baseUsed }
    })
  }

  updateUsed(used: number): void {
    this.budgetState.update(state => {
      return {...state, used}
    })
  }
}
