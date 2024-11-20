import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";

@Component({
  standalone: true,
  imports: [ CounterAloneComponent ],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

}
