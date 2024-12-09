import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Box } from '../models/boxes/boxes.module';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  private apiUrl = 'http://localhost:3000/boxes'

  constructor(private http: HttpClient) { }

    //Get Breaks
    getBoxes(): Observable<Box[]>{
      return this.http.get<Box[]>(`${this.apiUrl}`);
    }
  
    //Get Box
    getBox(id: string): Observable<Box>{
      return this.http.get<Box>(`${this.apiUrl}/${id}`);
    }
  
    //Update Box
    updateBox(box: Box): Observable<Box>{
      return this.http.put<Box>(`${this.apiUrl}`, {
          _id: box._id,
          brand: box.brand,
          sport: box.sport,
          description: box.description,
          price: box.price
      });
    }
  
    //Add Box
    addBox(box: Box): Observable<Box> {
      const payload = {
        _id: box._id,
        brand: box.brand,
        sport: box.sport,
        description: box.description,
        price: box.price
      };
    
      console.log('Sending add request for Box:', payload); // Debugging log
      return this.http.post<Box>(`${this.apiUrl}`, payload);
    }
  
    //Delete Box
    deleteBox(id: string): Observable<any>{
      const url = `${this.apiUrl}/${id}`;
    console.log('Deleting Box with URL:', url); // Log the URL
    return this.http.delete<any>(url);
    }
}
