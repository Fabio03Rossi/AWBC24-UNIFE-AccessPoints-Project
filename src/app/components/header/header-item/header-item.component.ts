import {
  Component,
  input,
  signal
} from '@angular/core';

@Component({
  selector: 'app-header-item',
  imports: [],
  templateUrl: './header-item.component.html',
  styleUrl: './header-item.component.css'
})
export class HeaderItem {
  text = input('Login')
}
