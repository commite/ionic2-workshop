import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoftsmartAPI } from '../../providers/api'


@Component({
  selector: 'page-properties',
  templateUrl: 'properties.html'
})
export class PropertiesPage {
  properties: any;
  baseURL: string = 'https://loftsmart-prod-media.s3.amazonaws.com/';

  constructor(public navCtrl: NavController,
              public api: LoftsmartAPI) {
    this.properties = {
      results: []
    };
    this.api.getProperties().subscribe(
      (res) => {
        console.log(res);
        this.properties = res;
      }, (err) => {
        console.error('Error:' + err);
      });
  }

  ionViewDidLoad() {
    console.log('Hello PropertiesPage Page');
  }

}
