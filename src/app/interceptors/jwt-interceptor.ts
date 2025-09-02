import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import {
  catchError,
  throwError
} from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  let token = localStorage.getItem('access_token');

  if (token) {
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authRequest)
  }
  return next(request);
};
