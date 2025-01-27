import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SportFilterService } from '../../services/sport-filter.service';
import { Product } from '../../services/cart.service';
import { CartService } from '../../services/cart.service';
import { BreaksService } from '../../services/breaks.service';

@Component({
  selector: 'app-breaks',
  template: ` <button (click)="addToCart(card)">Add to Cart</button> `,
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './breaks.component.html',
  styleUrl: './breaks.component.css'
})
export class BreaksComponent implements OnInit {
  selectedSport: string = 'All'; // Default to All
  breaks: any[] = []; //holds fetched breaks

  constructor(
    private sportFilterService: SportFilterService,
    private cartService: CartService,
    private breaksService: BreaksService
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in the selected sport
    this.sportFilterService.selectedSport$.subscribe(sport => {
      if (this.selectedSport === null) {
        this.selectedSport = 'All'
      } else {
        this.selectedSport = sport;
      }

      this.applyFilter(this.selectedSport);
      console.log(`Current sport: ${this.selectedSport}`);
    });

    // Fetch breaks from the service
    this.breaksService.getBreaks().subscribe((data: any) => {
      this.breaks = data; // Assign the fetched breaks
    });
  }

  applyFilter(sport: string): void {
    this.selectedSport = sport;
    console.log(`Filtering by sport: ${sport}`);
  }

  imgs = [
    { brand: 'Panini', sport: 'Basketball', description: '2023-24 Mosaic Hobby Box (Random Teams)', price: 300, img: '23-24_mosaic_basketball.png' },
    { brand: 'Panini', sport: 'Basketball', description: '2021-22 National Treasures Hobby Box (Random Teams)', price: 2000, img: '21-22_nt_basketball.png' },
    { brand: 'Panini', sport: 'Basketball', description: '2022-23 Prizm Hobby Box (Random Teams)', price: 1000, img: '22-23_Prizm_basketball.png' },
    { brand: 'Topps', sport: 'Soccer', description: '2023 Topps Chrome UEFA Hobby Box (Random Teams)', price: 200, img: '2023_chrome_soccer.jpg' },
    { brand: 'Topps', sport: 'Soccer', description: '2023 Topps Merlin UEFA Hobby Box (Random Teams)', price: 200, img: '2023_merlin_soccer.jpg' },
    { brand: 'Panini', sport: 'Soccer', description: '2024 Select FIFA Hobby Box (Random Teams)', price: 250, img: '2024_select_soccer.png' },
    { brand: 'Topps', sport: 'Football', description: '2023 Topps Composite Football Hobby Box (Random Teams)', price: 350, img: '2023_composite_fb.png' },
    { brand: 'Panini', sport: 'Football', description: '2023 Immaculate Football Hobby Box (Random Teams)', price: 1500, img: '2023_immaculate_fb.png' },
    { brand: 'Panini', sport: 'Football', description: '2023 Optic Football Hobby Box (Random Teams)', price: 700, img: '2023_Optic_fb.png' },
    { brand: 'Topps', sport: 'Baseball', description: '2023 Topps Dynasty Hobby Box (Random Teams)', price: 1500, img: '2023_dynasty_baseball.jpg' },
    { brand: 'Topps', sport: 'Baseball', description: 'Stadium Club Hobby Box (Random Teams)', price: 250, img: '2023_stadiumclub_baseball.png' },
    { brand: 'Topps', sport: 'Baseball', description: '2024 Topps Chrome Baseball Series 1 Hobby Box (Random Teams)', price: 250, img: '2024_chrome_baseball.png' },
  ];


  get filteredBreaks() {
    if (this.selectedSport === 'All') {
      return this.breaks; // Show all breaks if no sport is selected
    }
    else if (!this.selectedSport) {
      return this.breaks;
    }
    return this.breaks.filter(breaks => breaks.sport === this.selectedSport);
  }

  get filteredBreaksWithImages() {
    // Merge 'breaks' and 'imgs' arrays based on matching description
    return this.filteredBreaks.map((breaks) => {
      const matchingImg = this.imgs.find((img) => img.description === breaks.description);
      return {
        ...breaks,
        img: matchingImg ? matchingImg.img : 'default.jpg', // default image
      };
    });
  }

  filterBySport(sport: string): void {
    this.selectedSport = sport;
  }

  addToCart(product: Product): void {
    console.log("Added to cart");
    this.cartService.addToCart(product);
  }
}

