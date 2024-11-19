import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, MapStyle, Marker } from '@maptiler/sdk';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @Input()
  lngLat?: [number, number]

  @ViewChild('map')
  private divMap?: ElementRef<HTMLElement>;
  public map?: Map;

  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw 'Map Div not found';
    if ( !this.lngLat ) throw "LngLat can't be nul";

    const map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.lngLat,
      zoom: 15,
      navigationControl: false,
      interactive: false
    });

    new Marker()
    .setLngLat( this.lngLat )
    .addTo(map)

  }

}
