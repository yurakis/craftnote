import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

export abstract class IsAliveComponent implements OnDestroy {
  protected isAlive = true;

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  takeWhile<T>(): MonoTypeOperatorFunction<T> {
    return takeWhile(() => this.isAlive);
  }
}
