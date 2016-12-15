import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { LoftsmartAPI } from '../../providers/api';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: any = {
      username: '',
      password: ''
  };
  submitted: boolean = false;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, public api: LoftsmartAPI,
              fb: FormBuilder) {
    this.form = fb.group({
      'username': ['', [Validators.required]],
      'password': null
    }, {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.submitted = true;

    if (this.form.valid) {
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
          let toast = this.toastCtrl.create({
            message: 'Incorrect credentials. Please try again',
            duration: 4000,
            position: 'top',
            cssClass: 'error'
          });
          toast.present();
        });
    }
  }

  logged() {
    this.navCtrl.setRoot(TabsPage);
  }

}
