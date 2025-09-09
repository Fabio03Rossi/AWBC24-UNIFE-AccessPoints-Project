import {
  Component,
  inject,
  OnDestroy,
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
  fromEvent,
  map,
  merge,
  of,
  Subscription,
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
export class Login implements OnInit, OnDestroy {
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;
  loginService = inject(Accesso);

  // Segnali per il controllo degli elementi Form
  isWrong = signal(false);
  isLoading = signal(false);

  userId = signal("");
  password = signal("");

  constructor(private router: Router) {}


  generaJWT() {
    // Mostriamo il caricamento e rimuoviamo messaggi di errore
    this.isLoading.set(true);
    this.isWrong.set(false);

    // Richiamiamo il servizio per ottenere il JWT con i dati dell'utente
    this.loginService.getJWT(this.userId(), this.password())
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // Semplicemente supponiamo che i dati siano incorretti
          this.isWrong.set(true);
          this.isLoading.set(false);

          const error = err.error?.message || err.statusText;
          console.error(err);
          return throwError(() => error);
        })
      )
      .subscribe((res) => {
      if(res) {
        // Essendo i dati corretti si va al body
        this.isLoading.set(false);
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['accesspoint']);
      }
    })
  }

  // Per controllare se si è online
  checkStatoNetwork() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        console.log('status', status);
        this.networkStatus = status;
      });
  }

  ngOnInit() {
    localStorage.removeItem('access_token');
    this.checkStatoNetwork();
  }
  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }
}
