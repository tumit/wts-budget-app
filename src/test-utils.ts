import { DebugElement, Predicate } from '@angular/core';
import { By } from '@angular/platform-browser';

export const getByDataTestId = (id: string): Predicate<DebugElement> => {
  return By.css(`[data-testid=${id}]`);
};
