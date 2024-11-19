import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, MapStyle, Marker } from '@maptiler/sdk';

interface MarkerAndColor {
  color: string,
  marker: Marker
}

interface PlaneMarker{
  color: string,
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map')
  private divMap?: ElementRef<HTMLElement>;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentCenter: LngLat = new LngLat( -3.67, 40.41 )


  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentCenter,
      zoom: 14,
      navigationControl: false,
      geolocateControl: false,
      doubleClickZoom: false
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Juan Laguna';

    // const marker = new Marker({
    //   color: 'grey',
    //   element: markerHtml
    // })
    //   .setLngLat( this.currentCenter)
    //   .addTo(this.map);
  }


  createMarker() {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color)
  }

  addMarker( lngLat: LngLat, color: string) {
    if ( !this.map ) return;
    const marker = new Marker({ color: color, draggable: true })
      .setLngLat( lngLat )
      .addTo(this.map);

    marker.on('dragend', () => {
      this.saveToLocalStorage()
    })

    this.markers.push({color, marker});

    this.saveToLocalStorage();
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index,1);
    this.saveToLocalStorage();
  }

  flyTo( marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const planeMarkers: PlaneMarker[] = this.markers.map( ({color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('planeMarkers', JSON.stringify(planeMarkers));
  }

  readFromLocalStorage() {

    const planeMarkersString = localStorage.getItem('planeMarkers') ?? '[]';

    const planeMarkers: PlaneMarker[] = JSON.parse(planeMarkersString);

    planeMarkers.forEach( ({ color, lngLat})  => {
      const [ lng, lat ] = lngLat
      const coords = new LngLat(lng, lat);

      this.addMarker(coords,color);

    })

  }

}
