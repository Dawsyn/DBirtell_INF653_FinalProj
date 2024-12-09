import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Break } from '../models/breaks/breaks.module';

@Injectable({
  providedIn: 'root'
})
export class BreaksService {
  private apiUrl = 'http://localhost:3000/breaks'

  constructor(private http: HttpClient) { }

    //Get Breaks
    getBreaks(): Observable<Break[]>{
      return this.http.get<Break[]>(`${this.apiUrl}`);
    }
  
    //Get Break
    getBreak(id: string): Observable<Break>{
      return this.http.get<Break>(`${this.apiUrl}/${id}`);
    }
  
    //Update Break
    updateBreak(breaks: Break): Observable<Break>{
      return this.http.put<Break>(`${this.apiUrl}`, {
          _id: breaks._id,
          brand: breaks.brand,
          sport: breaks.sport,
          description: breaks.description,
          price: breaks.price
      });
    }
  
    //Add Break
    addBreak(breaks: Break): Observable<Break> {
      const payload = {
        _id: breaks._id,
        brand: breaks.brand,
        sport: breaks.sport,
        description: breaks.description,
        price: breaks.price
      };
    
      console.log('Sending add request for Break:', payload); // Debugging log
      return this.http.post<Break>(`${this.apiUrl}`, payload);
    }
  
    //Delete Break
    deleteBreak(id: string): Observable<any>{
      const url = `${this.apiUrl}/${id}`;
    console.log('Deleting Break with URL:', url); // Log the URL
    return this.http.delete<any>(url);
    }
}
