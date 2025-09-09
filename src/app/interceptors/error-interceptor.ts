import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import {
  catchError,
  throwError
} from 'rxjs';
import {
  Router
} from '@angular/router';
import {
  inject
} from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);

  // Intercettiamo qualsiasi errore di autorizzazione e rimuoviamo il token per sicurezza, rimandando al Login
  return next(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if ([401, 403].includes(err.status)) {
          localStorage.removeItem('access_token');
          router.navigateByUrl('/');
        }

        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);
      })
    );
};
