import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { DxMapComponent, DxListComponent } from 'devextreme-angular';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {
  @ViewChild(DxMapComponent, {read: null, static: false}) mapComponent: DxMapComponent;
  @ViewChild(DxListComponent, { static: false }) list: DxListComponent;

  markers = [];
  selectedMarkers: any[] = [];
  showSetLocation: boolean;
  popupToolbarItems: any[];
  center= {};
  selectedMarker = {
    User: {
    }
  };
  showPopup = false;

  constructor(private mapService: MapService) { }

  ngOnInit() {

  }

  setLocation(data) {
    
    this.mapService.setLocation(data.lat, data.lng).then(res => {
      this.showSetLocation = false;
    })
  } 

  onSetLocationClick() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapComponent.center = { lat: position.coords.latitude, lng: position.coords.longitude};
      });
    }
  }

  onFindAroundHereClick() {
    let center: any = this.mapComponent.center;
    this.mapService.getUsersAround(center.lat, center.lng, 0.05).then(r =>
    {
      this.mapComponent.instance.beginUpdate();
      for (let index = 0; index < this.mapComponent.markers.length; index++) {
        const marker = this.mapComponent.markers[index];
        this.mapComponent.instance.removeMarker(marker);
      }
      this.markers.splice(0, this.markers.length);
      r.forEach(u => {
        this.mapComponent.instance.addMarker({ location: { lat: u.Location.X, lng: u.Location.Y}, User: u.User, onClick: ($event) => this.onMarkerClick(u), label: {text: u.User.FirstName + ' ' + u.User.LastName}  });
      });
      this.mapComponent.instance.endUpdate();
    })
  }

  onSelectionChanged(e) {
    if(e.addedItems) {
      this.mapComponent.center = e.addedItems[0].location;
    }
  }

  showDetail(e) {
    this.selectedMarker = e;
    this.showPopup = true;
  }

  onMarkerClick(e) {
    var marker = this.findMarkerByUserId(e.User.Id);
    this.list.instance.option("selectedItems", [marker]);
  }

  findMarkerByUserId(Id: any) {
    return this.markers.find(m => m.User.Id === Id);
  }
}
