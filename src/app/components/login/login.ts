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
  OttieniAccessPoint
} from '../../services/ottieni-access-point';
import {
  AccessPoint
} from '../../model/accesspoint.type';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

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
  userId = signal("");
  password = signal("");

  constructor(private router: Router) {}

  generaJWT() {
    this.loginService.getJWT(this.userId(), this.password()).subscribe((res) => {
      if(res) {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    localStorage.removeItem('access_token');
  }
}
