import {
  HttpInterceptorFn
} from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  let token = localStorage.getItem('access_token');

  // In questo caso se il token è presente lo aggiungiamo all'header di tutte le richieste Http
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
