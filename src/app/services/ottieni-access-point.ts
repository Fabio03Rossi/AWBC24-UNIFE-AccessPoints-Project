import {
  inject,
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  AccessPoint
} from '../model/accesspoint.type';
import {
  Login
} from '../components/login/login';
import {
  Observable
} from 'rxjs';

@Injectable()
export class OttieniAccessPoint {
  http = inject(HttpClient);

  getAPIAccessPoints(input: string) {
    const url = input == "" ? "http://localhost:5202/api/AccessPoint/OttieniAccessPoint"
      : "http://localhost:5202/api/AccessPoint/RicercaEdificio?Edificio=" + input;

    return this.http.get<Array<AccessPoint>>(url);
  }
}
