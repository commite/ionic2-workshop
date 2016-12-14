import { Component } from '@angular/core';
import { Config, LoadingController, NavController, Loading } from 'ionic-angular';
import { LoftsmartAPI } from '../../providers/api'


@Component({
  selector: 'page-properties',
  templateUrl: 'properties.html'
})
export class PropertiesPage {
  properties: any[] = [];
  baseURL: string;
  loader: Loading;

  constructor(public config: Config,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public api: LoftsmartAPI) {
    this.baseURL = config.get('baseMediaURL');
    this.api.getProperties().subscribe(
      (res) => {
        this.properties = res.results;
        this.loader.dismiss();
      }, (err) => {
        console.error('Error:' + err);
      });
  }

  getImageURL(property) {
    // hack: remove the /media/ URL fragment if exists to be used in devel Django env
    return this.baseURL + property.images[0].image.list.replace('/media/', '');
  }

  ionViewDidLoad() {
    console.log('Hello PropertiesPage Page');
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

}
