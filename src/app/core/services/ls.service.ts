import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Ls {

  constructor() {}

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, String(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

}
