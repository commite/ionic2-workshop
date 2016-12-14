import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoftsmartAPI } from '../../providers/api';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  isLogged: boolean = false;

  constructor(public navCtrl: NavController, public api: LoftsmartAPI) {

    if (this.api.isLogged()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }
}
