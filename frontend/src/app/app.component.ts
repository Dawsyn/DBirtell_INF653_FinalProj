import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BoxesComponent } from './components/boxes/boxes.component';
import { BreaksComponent } from './components/breaks/breaks.component';
import { SinglesComponent } from './components/singles/singles.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, SinglesComponent, BreaksComponent, BoxesComponent, ImageUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'card-shop';
}
