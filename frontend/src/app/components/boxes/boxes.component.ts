import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SportFilterService } from '../../services/sport-filter.service';
import { Product } from '../../services/cart.service';
import { CartService } from '../../services/cart.service';
import { BoxesService } from '../../services/boxes.service';


@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.css'
})
export class BoxesComponent implements OnInit {
  selectedSport: string = 'All'; // Default to 'All'
  boxes: any[] = []; //holds fetched cards

  constructor(
    private sportFilterService: SportFilterService,
    private cartService: CartService,
    private boxesService: BoxesService
  ) {}

  ngOnInit(): void {
    // Subscribe to changes in the selected sport
    this.sportFilterService.selectedSport$.subscribe(sport => {
      if(this.selectedSport === null){
        this.selectedSport = 'All'
      }else{
        this.selectedSport = sport;
      }
      
      this.applyFilter(this.selectedSport);
      console.log(`Current sport: ${this.selectedSport}`);
    });

    // Fetch cards from the service
    this.boxesService.getBoxes().subscribe((data: any) => {
      this.boxes = data; // Assign the fetched cards
    });
  }

  applyFilter(sport: string): void {
    this.selectedSport = sport;
    console.log(`Filtering by sport: ${sport}`);
  }
  
  imgs = [
    { brand: 'Panini', sport: 'Basketball', description: '2023-24 Mosaic Hobby Box', price:300, img: '23-24_mosaic_basketball.png' },
    { brand: 'Panini', sport: 'Basketball', description: '2021-22 National Treasures Hobby Box', price:2000, img: '21-22_nt_basketball.png' },
    { brand: 'Panini', sport: 'Basketball', description: '2022-23 Prizm Hobby Box', price: 1000, img: '22-23_Prizm_basketball.png' },
    { brand: 'Topps', sport: 'Soccer', description: '2023 Topps Chrome UEFA Hobby Box', price:200, img: '2023_chrome_soccer.jpg' },
    { brand: 'Topps', sport: 'Soccer', description: '2023 Topps Merlin UEFA Hobby Box', price:200, img: '2023_merlin_soccer.jpg' },
    { brand: 'Panini', sport: 'Soccer', description: '2024 Select FIFA Hobby Box', price:250, img: '2024_select_soccer.png' },
    { brand: 'Topps', sport: 'Football', description: '2023 Topps Composite Football Hobby Box', price:350, img: '2023_composite_fb.png' },
    { brand: 'Panini', sport: 'Football', description: '2023 Immaculate Football Hobby Box', price:1500, img: '2023_immaculate_fb.png' },
    { brand: 'Panini', sport: 'Football', description: '2023 Optic Football Hobby Box', price:700, img: '2023_Optic_fb.png' },
    { brand: 'Topps', sport: 'Baseball', description: '2023 Topps Dynasty Hobby Box', price:1500, img: '2023_dynasty_baseball.jpg' },
    { brand: 'Topps', sport: 'Baseball', description: 'Stadium Club Hobby Box', price:250, img: '2023_stadiumclub_baseball.png' },
    { brand: 'Topps', sport: 'Baseball', description: '2024 Topps Chrome Baseball Series 1 Hobby Box', price:250, img: '2024_chrome_baseball.png' },
  ];


    get filteredBoxes() {
      if (this.selectedSport === 'All') {
        return this.boxes; // Show all boxes if no sport is selected
      }
      else if(!this.selectedSport){
        return this.boxes;
      }
      return this.boxes.filter(boxes => boxes.sport === this.selectedSport);
    }
  
      get filteredBoxesWithImages() {
        // Merge `breaks` and `imgs` arrays based on matching description
        return this.filteredBoxes.map((boxes) => {
          const matchingImg = this.imgs.find((img) => img.description === boxes.description);
          return {
            ...boxes,
            img: matchingImg ? matchingImg.img : 'default.jpg', // Fallback to default image
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
