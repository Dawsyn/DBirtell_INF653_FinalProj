import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Backend's URL
  private currentUserSubject: BehaviorSubject<any>;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  public currentUser: Observable<any>;
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const currentUser = this.getItemFromStorage('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/auth`, { username: username, password: password })
      .pipe(
        map((user) => {
          if (user && user.accessToken) {
            this.setItemToStorage('currentUser', user);
            this.currentUserSubject.next(user);
            this.isLoggedInSubject.next(true); // Notify that the user is logged in
          }
          return user;
        })
      );
  }

  logout() {
    this.removeItemFromStorage('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false); // Notify that the user is logged out
    return this.http.get(`${this.baseUrl}/logout`, {});
  }

  refreshToken() {
    return this.http.get<any>(`${this.baseUrl}/refresh`).pipe(
      map((user) => {
        if (user && user.accessToken) {
          let currentUser = this.currentUserSubject.value;
          currentUser.accessToken = user.accessToken;
          this.setItemToStorage('currentUser', currentUser);
          this.currentUserSubject.next(currentUser);
        }
        return user;
      })
    );
  }

  isAuthenticated(): boolean {
    const currentUser = this.currentUserSubject.value;
    return !!currentUser && !!currentUser.accessToken;
  }

  getAccessToken(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.accessToken : null;
  }

  private hasToken(): boolean {
    return !!this.getItemFromStorage('currentUser');
  }

  private setItemToStorage(key: string, value: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  private getItemFromStorage(key: string): any {
    if (typeof localStorage !== 'undefined') {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null; // Return null if localStorage is unavailable
  }

  private removeItemFromStorage(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
