import {
  inject,
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  JsonResponseType
} from '../model/jsonresponse.type';

@Injectable()
export class Accesso {
  http = inject(HttpClient);

  getJWT(userId: string, password: string) {
    const url = "http://localhost:5202/api/Login/Login";
    return this.http.post<JsonResponseType | null>(url, { "id": userId, "password": password });
  }
}
