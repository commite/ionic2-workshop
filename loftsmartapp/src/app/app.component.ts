import { Component, ViewChild } from '@angular/core';
import { AlertController, MenuController, Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoftsmartAPI } from '../providers/api';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class LoftsmartApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  pages: any[];

  constructor(public alertCtrl: AlertController, public menu: MenuController,
              public api: LoftsmartAPI, platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // create an list of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home' },
      { title: 'About', component: AboutPage, icon: 'information-circle' }
    ];
  }

  openPage(page: any) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page['index']) {
      this.nav.setRoot(page['component'], {tabIndex: page['index']}).then(() => {
        // wait for the root page to be completely loaded
        // then close the menu
        this.menu.close();
      });
    } else {
      this.nav.push(page['component']).then(() => {
        this.menu.close();
      });
    }
  }

  goToLogin() {
    this.nav.push(LoginPage);
    this.menu.close();
  }

  askForLogout() {
    this.menu.close();
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Do you want to exit now?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel logout clicked');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            console.log('Exit clicked');
            this.api.logout();
            this.nav.setRoot(TabsPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
