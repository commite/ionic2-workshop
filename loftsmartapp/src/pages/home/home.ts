import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoftsmartAPI } from '../../providers/api'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public api: LoftsmartAPI) {
  }

  logout() {
    this.api.logout();
  }
}
