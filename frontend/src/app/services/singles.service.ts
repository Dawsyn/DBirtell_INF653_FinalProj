import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/singles/singles.module';

@Injectable({
  providedIn: 'root'
})
export class SinglesService {

  private apiUrl = 'http://localhost:3000/singles'

  constructor(private http: HttpClient) { }

    //Get cards
    getCards(): Observable<Card[]>{
      return this.http.get<Card[]>(`${this.apiUrl}`);
    }
  
    //Get Card
    getCard(id: string): Observable<Card>{
      return this.http.get<Card>(`${this.apiUrl}/${id}`);
    }
  
    //Update Card
    updateCard(card: Card): Observable<Card>{
      return this.http.put<Card>(`${this.apiUrl}`, {
          _id: card._id,
          firstname: card.firstname,
          lastname: card.lastname,
          sport: card.sport,
          description: card.description,
          price: card.price
      });
    }
  
    //Add Card
    addCard(card: Card): Observable<Card> {
      const payload = {
        _id: card._id,
        firstname: card.firstname,
        lastname: card.lastname,
        sport: card.sport,
        description: card.description,
        price: card.price
      };
    
      console.log('Sending add request for Card:', payload); // Debugging log
      return this.http.post<Card>(`${this.apiUrl}`, payload);
    }
  
    //Delete Card
    deleteCard(id: string): Observable<any>{
      const url = `${this.apiUrl}/${id}`;
    console.log('Deleting Card with URL:', url); // Log the URL
    return this.http.delete<any>(url);
    }
}
