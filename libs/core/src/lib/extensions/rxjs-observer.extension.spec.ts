import { Observable } from 'rxjs';
import './rxjs-observer.extension';

describe('rxjs-observer.extension', () => {
  it('nextAndComplete with value', () => {
    let counter = 0;
    const a = new Observable<string>(sub => { sub.nextAndComplete('a') })
      .subscribe(
        r => {
          expect(counter++).toBe(1);
          expect(r).toBe('a');
        },
        () => fail(new Error('observable should not throw error')),
        () => expect(counter++).toBe(2)
      );
  });

  it('nextAndComplete void', () => {
    let counter = 0;
    const a = new Observable<void>(sub => { sub.nextAndComplete() })
      .subscribe(
        () => expect(counter++).toBe(1),
        () => fail(new Error('observable should not throw error')),
        () => expect(counter++).toBe(2)
      );
  });
});
