import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { DxMapComponent } from 'devextreme-angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(DxMapComponent, {read: null, static: false}) mapComponent: DxMapComponent;

  markers = [];
  showSetLocation: boolean;
  popupToolbarItems: any[];
  center= {};

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  setLocation(data) {
    this.mapService.setLocation(data.lat, data.lng);
  } 

  onSetLocationClick() {
    var mc = this.mapComponent;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        
        for (let index = 0; index < this.mapComponent.markers.length; index++) {
          const marker = this.mapComponent.markers[index];
          this.mapComponent.instance.removeMarker(marker);
        }
        mc.instance.addMarker({
          location: {lat: position.coords.latitude, lng: position.coords.longitude},
          tooltip: "You're here"
        })
        this.mapComponent.center = {lat: position.coords.latitude, lng: position.coords.longitude};
      });
    }
  }

  onMapClick(e) {
    for (let index = 0; index < this.mapComponent.markers.length; index++) {
      const marker = this.mapComponent.markers[index];
      this.mapComponent.instance.removeMarker(marker);
    }
    this.mapComponent.instance.addMarker({ location: {lat: e.location.lat, lng: e.location.lng}, tooltip: "You're here" });
  }

  onSaveLocationClick() {
    if(this.markers) {
      this.setLocation(this.markers[0].location);
    } else {
      alert("Select your location first");
    }
  }
}
