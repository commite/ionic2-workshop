import { Component } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { LoftsmartAPI } from '../../providers/api'


@Component({
  selector: 'page-properties',
  templateUrl: 'properties.html'
})
export class PropertiesPage {
  properties: any[] = [];
  baseURL: string;

  constructor(public config: Config,
              public navCtrl: NavController,
              public api: LoftsmartAPI) {
    this.baseURL = config.get('baseMediaURL');
    this.api.getProperties().subscribe(
      (res) => {
        this.properties = res.results;
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
  }

}
