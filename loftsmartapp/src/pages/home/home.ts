import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoftsmartAPI } from '../../providers/api'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public api: LoftsmartAPI) {
  }

  login() {
    this.api.login('johnsmith@smith.com', 'pepe1234').then(
      () => {
        console.log('autenticado');
      }, (err) => {
        console.log('error');
      });
  }
}
