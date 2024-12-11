import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public openEmail() {
    // Opens a new email composition window
    window.location.href = "mailto:Marketing@fake-TheCardShop.com?subject=Big Hits!";
}
}
