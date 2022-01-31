import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[ngExtMouse]'
})
export class MouseDirective implements AfterViewInit, OnDestroy {
  @Input() public dblClickSpeed = 200;
  @Output() public readonly clickOrDblClick = new EventEmitter<MouseEvent>();

  private eventsSubscription?: Subscription;

  public constructor(private el: ElementRef<HTMLElement>) { }

  public ngAfterViewInit(): void {
    if (this.clickOrDblClick.observers.length > 0) {
      const eventsMerged = merge(
        fromEvent<MouseEvent>(this.el.nativeElement, 'click'),
        fromEvent<MouseEvent>(this.el.nativeElement, 'dblclick'))
        .pipe(debounceTime(this.dblClickSpeed));

      this.eventsSubscription = eventsMerged.subscribe(event => {
        this.clickOrDblClick.next(event);
      });
    }
  }

  public ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
