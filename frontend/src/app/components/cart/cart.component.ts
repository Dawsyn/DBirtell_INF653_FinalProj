import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CartService, Product } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  
  constructor(private cartService: CartService) {}
  

  //Clears cart visually
  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }
    
  getTotalPrice(): number {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    }
  

  // Clear the cart
  clearCart(): void{
    this.cartService.clearCart();
  }
}
