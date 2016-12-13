import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { LoftsmartAPI } from '../../providers/api'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public api: LoftsmartAPI) {
    this.user = {
      username: 'johnsmith@smith.com',
      password: 'pepe1234'
    };
  }

  login() {
    this.api.login(this.user.username, this.user.password).then(
      () => {
        console.log('autenticado');
        let toast = this.toastCtrl.create({
          message: 'Welcome',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, (err) => {
        console.log('error');
      });
  }
}
