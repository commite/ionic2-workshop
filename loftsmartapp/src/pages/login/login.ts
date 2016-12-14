import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { LoftsmartAPI } from '../../providers/api';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public user: any = {
      username: 'johnsmith@smith.com',
      password: 'pepe1234'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, public api: LoftsmartAPI) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
        this.logged();
      }, (err) => {
        console.log('error');
      });
  }

  logged() {
    this.navCtrl.setRoot(TabsPage);
  }

}
