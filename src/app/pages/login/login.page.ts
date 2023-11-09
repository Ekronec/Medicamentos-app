import { Component, OnInit } from '@angular/core';
import { OpenCloseComponent } from '../../open-close/open-close.component'; // Importa la clase OpenCloseComponent

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
  constructor() {}

  ngOnInit() {}
}
