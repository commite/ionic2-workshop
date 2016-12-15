import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: GoogleMap;
  property: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, public platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ngAfterViewInit() {
  }

  ionViewDidEnter() {
    this.loadMap();
    this.property = this.navParams.get('property');
    if (this.property) {
      this.map.clear();
      this.showProperty();
    }
  }

  showProperty() {
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      // create position object
      let position: GoogleMapsLatLng = new GoogleMapsLatLng(
        this.property['location']['lat'], this.property['location']['lng']);

      // create CameraPosition
      let cameraPosition: CameraPosition = {
        target: position,
        zoom: 18,
        tilt: 30
      };

      // move the map's camera to position
      this.map.moveCamera(cameraPosition);

      // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: position,
        title: this.property.name,
        snippet: this.property.address,
        icon: 'file:///android_asset/www/assets/icon/pinpoint.png'
      };

      this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
    });
  }

  loadMap() {
    if (this.platform.is('cordova')) {
      // create a new map by passing HTMLElement
      let element: HTMLElement = document.getElementById('map');

      let map = new GoogleMap(element);
      this.map = map;
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('Map is ready without property!');
        let center: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);
        let cameraPosition: CameraPosition = {
          target: center,
          zoom: 18,
          tilt: 30
        };
        // move the map's camera to position
        this.map.moveCamera(cameraPosition);
      });
    } else {
      let toast = this.toastCtrl.create({
        message: 'Cordova is not enabled. Maybe is executed in a browser?',
        duration: 5000,
        position: 'top',
        cssClass: 'error'
      });
      toast.present();
    }
  }
}
