import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjects: Map<string, BehaviorSubject<any>> = new Map();
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _isMobile = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  setIsLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }

  get isMobile(): Observable<boolean> {
    return this._isMobile.asObservable();
  }

  setIsMobile(value: boolean): void {
    this._isMobile.next(value);
  }

  set(key: string, value: any): void {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<any>(value));
    }
    this.subjects.get(key)?.next(value);
  }

  get(key: string): Observable<any> {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<any>(null));
    }
    return this.subjects.get(key)!.asObservable();
  }
}
