import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cartSubject = new BehaviorSubject<Product[]>(this.getCartItems());
    public cart$ = this.cartSubject.asObservable();
  
    constructor() {}
  
    addToCart(product: Product): void {
      const currentCart = this.cartSubject.value; // Get the current cart value
      const updatedCart = [...currentCart, product];
  
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      // Emit the updated cart
      this.cartSubject.next(updatedCart);
    }

      getCartItems(): Product[] {
        if (typeof localStorage !== 'undefined') {
          const cartJson = localStorage.getItem('cart');
          return cartJson ? JSON.parse(cartJson) as Product[] : [];
        }
        return []; // Return an empty array if localStorage is not available
      }
  
    clearCart(): void {
      localStorage.removeItem('cart');
  
      // Emit an empty array
      this.cartSubject.next([]);
    }

}

  export interface Product {
    id: number;
    name?: string;
    brand?: string;
    player?: string;
    sport: string;
    description: string;
    price: number; 
    img?: string;
  }