import { Component } from '@angular/core';
import { DashboardNavComponent } from "./dashboard-nav/dashboard-nav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
