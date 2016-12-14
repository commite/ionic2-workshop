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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, public platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ngAfterViewInit() {
    if (this.platform.is('cordova')) {
      this.loadMap();
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

  loadMap() {

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };

    map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
         marker.showInfoWindow();
      });
  }
}
