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
  query: string = '';
  loader: Loading;

  constructor(public config: Config,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public api: LoftsmartAPI) {
    this.baseURL = config.get('baseMediaURL');
    this.loadProperties();
  }

  loadProperties() {
    this.api.getProperties(this.query).subscribe(
      (res) => {
        this.properties = res.results;
        this.loader.dismiss();
      }, (err) => {
        console.error('Error:' + err);
      });
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });
    this.loader.present();
  }

  refreshProperties() {
    this.showLoading();
    this.loadProperties();
  }

  getImageURL(property) {
    // hack: remove the /media/ URL fragment if exists to be used in devel Django env
    return this.baseURL + property.images[0].image.list.replace('/media/', '');
  }

  ionViewDidLoad() {
    console.log('Hello PropertiesPage Page');
    this.showLoading();
  }

  changeSearchbar(searchbar) {
    if (searchbar && searchbar.target.value) {
      this.query = searchbar.target.value;
    } else {
      this.query = '';
    }
    this.refreshProperties();
  }
}
