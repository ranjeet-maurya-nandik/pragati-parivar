import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }
  public get(key: any):any | null {
    return localStorage.getItem(key);
  }

  public set(key: any, value: any) :any | null {
    return localStorage.setItem(key, value);
  }

  public remove(key: any):any | null {
    return localStorage.removeItem(key);
  }

  public clear() {
    return window.localStorage.clear();
  }

  public isOem(key: string)
  {
    return (localStorage.getItem(key)=='oem');
  }
}
