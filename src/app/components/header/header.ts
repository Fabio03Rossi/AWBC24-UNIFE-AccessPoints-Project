import {
  Component,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderItem } from './header-item/header-item.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HeaderItem],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  login = signal("Login")
}
