import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  Router,
  RouterLink
} from '@angular/router';
import {
  Accesso
} from '../../services/accesso';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  catchError,
  throwError
} from 'rxjs';
import {
  HttpErrorResponse
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [Accesso]
})
export class Login implements OnInit {
  loginService = inject(Accesso);
  isPressed = signal(false);

  userId = signal("");
  password = signal("");

  constructor(private router: Router) {}

  generaJWT() {
    this.loginService.getJWT(this.userId(), this.password())
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.isPressed.set(true);

          const error = err.error?.message || err.statusText;
          console.error(err);
          return throwError(() => error);
        })
      )
      .subscribe((res) => {
      if(res) {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['accesspoint']);
      }
    })
  }

  ngOnInit() {
    localStorage.removeItem('access_token');
  }
}
