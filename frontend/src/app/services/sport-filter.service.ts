import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportFilterService {
  private selectedSport = new BehaviorSubject<string>(''); // Default to 'All'
  selectedSport$ = this.selectedSport.asObservable();

  setSport(sport: string): void {
    this.selectedSport.next(sport);
  }
}
