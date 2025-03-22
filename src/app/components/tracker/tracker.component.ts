import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent {

}
