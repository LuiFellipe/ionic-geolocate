import { Component,OnInit, OnDestroy  } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit, OnDestroy {
  map: Leaflet.Map; 
  lat: any;
  lon: any;
  constructor(private geolocation: Geolocation) {}

  Var_latitude: any;
  Var_longitude: any; 

  resultado() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);

        this.leafletMap(resp.coords.latitude, resp.coords.longitude);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
  ngOnInit() {}

  ionViewDidEnter() {
    this.resultado();
  }
leafletMap(lat, long) {
    this.map = Leaflet.map('mapId', {
      center: [lat, long],
      zoom: 14,
    });

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Mapa ETEC',
    }).addTo(this.map);

    const ondeestou = Leaflet.icon({
      iconUrl: '../../assets/ondeestou.png',
      iconSize: [38, 52],
      iconAnchor: [20, 40],
      popupAnchor: [-3, -40],
    });

    Leaflet.marker({ lat: -23.9700323, lng: -46.3159908 }, { icon: ondeestou })
      .addTo(this.map)
      .bindPopup('Estou aqui');

    const options = {
      radius: 300,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.2,
    };

    Leaflet.circle({ lat: -23.9700323, lng: -46.3159908 }, options).addTo(
      this.map
    );
  }
  ngOnDestroy() {
    this.map.remove();
  }





}
