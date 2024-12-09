import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SportFilterService } from '../../services/sport-filter.service';
import { CartService } from '../../services/cart.service';
import { OnInit } from '@angular/core';
import { Product } from '../../services/cart.service';
import { SinglesService } from '../../services/singles.service';

@Component({
  selector: 'app-singles',
  template: ` <button (click)="addToCart(card)">Add to Cart</button> `,
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './singles.component.html',
  styleUrl: './singles.component.css'
})
export class SinglesComponent implements OnInit {
  selectedSport: string = 'All'; // Default to 'All'
  cards: any[] = []; //holds fetched cards

  constructor(
    private sportFilterService: SportFilterService,
    private cartService: CartService,
    private singlesService: SinglesService
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
    });

    // Fetch cards from the service
    this.singlesService.getCards().subscribe((data: any) => {
      this.cards = data; // Assign the fetched cards
    });
  }

  applyFilter(sport: string): void {
    this.selectedSport = sport;
  }


  /* selectedSport: string = ''; // Stores the selected sport */
  cardImg = [
    { description: "SGC 10 Select Orange /65", price:40, img: "IMG_0327.jpg" },
    { description: "PSA 10 Mosaic Purple No Huddle Purple /50", price:40, img: "IMG_0325.jpg" },
    { description: "PSA 10 Topps Chrome Silver Mini Diamonds /199", price:60, img: "IMG_0092.jpg" },
    { description: "PSA 10 Topps Finest Purple /299", price:50, img: "IMG_0093.jpg" },
    { description: "Prizm Pink Cracked Ice", price:80, img: "IMG_3753.jpg" },
    { description: "Prestige Heroes Red /299", price:25, img: "IMG_0321.jpg" },
    { description: "PSA 8 Select Premier Level Blue", price:5, img: "IMG_0323.jpg" },
    { description: "PSA 10 Obsidian Electric Etch Orange Flood /99", price:50, img: "IMG_0329.jpg" },
    { description: "SGC 10 NBA Hoops Presentations", price:100, img: "IMG_3669.PNG" },
    { description: "SGC 9.5 Optic Holo Lights Out", price:20, img: "IMG_3670.PNG" },
    { description: "SGC 9 Optic Holo Lights Out", price:10, img: "IMG_3671.PNG" },
    { description: "SGC 10 | Auto 10 Mosaic Scripts", price:150, img: "IMG_3673.PNG" },
  ];

  get filteredCards() {
    if (this.selectedSport === 'All') {
      return this.cards; // Show all cards if no sport is selected
    }
    else if(!this.selectedSport){
      return this.cards;
    }
    return this.cards.filter(card => card.sport === this.selectedSport);
  }

    get filteredCardsWithImages() {
      // Merge `cards` and `cardImg` arrays based on matching description
      return this.filteredCards.map((card) => {
        const matchingImg = this.cardImg.find((img) => img.description === card.description);
        return {
          ...card,
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
