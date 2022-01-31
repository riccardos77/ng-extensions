/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JsonReviverFunction } from '../classes/json-reviver';

export class JsonReviverInterceptor implements HttpInterceptor {
  public constructor(private reviverFn: JsonReviverFunction) { }

  public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.responseType === 'json') {
      return next.handle(httpRequest)
        .pipe(
          filter((ev): ev is HttpResponse<any> => ev instanceof HttpResponse),
          map(event => event.clone({
            body: JSON.parse(
              typeof event.body === 'string' ? event.body : JSON.stringify(event.body),
              this.reviverFn)
          }))
        );
    } else {
      return next.handle(httpRequest);
    }
  }
}
