import {
  Component,
  signal
} from '@angular/core';
import {
  Router,
  RouterLink
} from '@angular/router';
import { HeaderItem } from './header-item/header-item.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HeaderItem],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  login = signal("Login")

  // A seconda della presenza del token cambiamo il testo del pulsante nell'Header
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      let token = localStorage.getItem('access_token');
      if (token) {
        this.login.set("Logout")
      } else {
        this.login.set("Login")
      }
    });
  }

  // Quando si preme il tasto di Login/Logout rimuoviamo il token e rimandiamo alla pagina di accesso
  removeToken(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
