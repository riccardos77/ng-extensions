import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UrlTree } from '@angular/router';
import { ILeavePage } from '@ng-ext/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-router',
  templateUrl: './test-router.component.html',
  styleUrls: ['./test-router.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestRouterComponent implements ILeavePage {
  public canLeavePageValue = true;

  public canUnloadWindow(): boolean {
    return this.canLeavePageValue;
  }

  public canDeactivateRoute(): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
    return new Observable(sub => {
      sub.next(this.canLeavePageValue ? true : confirm('exit?'));
      sub.complete();
    });
  }
}
