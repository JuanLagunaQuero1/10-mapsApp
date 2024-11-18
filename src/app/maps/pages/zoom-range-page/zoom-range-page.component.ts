import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LngLat, Map, MapStyle } from '@maptiler/sdk';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  private divMap?: ElementRef<HTMLElement>;

  public zoom: number = 11;
  public map?: Map;
  public currentCenter: LngLat = new LngLat( -3.79, 37.77 )


  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentCenter,
      zoom: this.zoom,
      navigationControl: false,
      geolocateControl: false,
      doubleClickZoom: false
    });

    this.mapListeners();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  mapListeners() {
    if ( !this.map ) throw 'Mapa no inicializado'

    this.map.on('zoom', () => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() < 21) return;
      this.map?.zoomTo(21);
    });

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() > 0.5) return;
      this.map?.zoomTo(0.5);
    });

    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

}
