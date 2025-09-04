import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  OttieniAccessPoint
} from '../../services/ottieni-access-point';
import {
  AccessPoint
} from '../../model/accesspoint.type';
import {
  BehaviorSubject,
  catchError
} from 'rxjs';
import {
  FormsModule
} from '@angular/forms';
import {
  Login
} from '../login/login';
import {
  Router,
  RouterLink
} from '@angular/router';

@Component({
  selector: 'app-body',
  imports: [
    FormsModule
  ],
  templateUrl: './body.html',
  styleUrl: './body.css',
  providers: [OttieniAccessPoint]
})
export class Body implements OnInit {
  apService = inject(OttieniAccessPoint);
  apItems = signal<Array<AccessPoint>>([])
  valoreRicerca: string = "";

  constructor(private router: Router) {}

  aggiornaListaAP() {
    this.apService.getAPIAccessPoints(this.valoreRicerca)
      .pipe(
        catchError(error => {
          console.log(error);
          throw error;
        })
      )
      .subscribe((aps) => {
        this.apItems.set(aps);
      })
  }

  ngOnInit() {
    this.apService.getAPIAccessPoints(this.valoreRicerca)
      .subscribe((aps) => {
        this.apItems.set(aps);
      })
  }
}
