import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarsBtnService {

  private isAnotherComponentActiveSource = new BehaviorSubject<boolean>(false);
  isAnotherComponentActive$ = this.isAnotherComponentActiveSource.asObservable();

  toggleAnotherComponent() {
    this.isAnotherComponentActiveSource.next(!this.isAnotherComponentActiveSource.value);
  }
}
