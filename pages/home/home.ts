import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  lat: any;
  lon: any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.resultado();
  }
  resultado() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.lat = ' ' + resp.coords.latitude;
        this.lon = ' ' + resp.coords.longitude;
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
}
