import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, MapStyle } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map')
  private divMap?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';

    const map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: [-74.5, 40],
      zoom: 9,
    });
  }
}
