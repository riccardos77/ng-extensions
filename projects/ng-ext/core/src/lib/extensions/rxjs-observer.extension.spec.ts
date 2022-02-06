import { Observable } from 'rxjs';
import './rxjs-observer.extension';

describe('rxjs-observer.extension', () => {
  it('nextAndComplete with value', () => {
    let counter = 0;

    new Observable<string>(sub => {
      sub.nextAndComplete('a');
    }).subscribe({
      next: r => {
        expect(counter++).toBe(1);
        expect(r).toBe('a');
      },
      error: () => fail(new Error('observable should not throw error')),
      complete: () => {
        expect(counter++).toBe(2);
      },
    });
  });

  it('nextAndComplete void', () => {
    let counter = 0;
    new Observable<void>(sub => {
      sub.nextAndComplete();
    }).subscribe({
      next: () => {
        expect(counter++).toBe(1);
      },
      error: () => fail(new Error('observable should not throw error')),
      complete: () => {
        expect(counter++).toBe(2);
      },
    });
  });
});
