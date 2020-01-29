import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeFilterService {
  private reciperFilter = new BehaviorSubject<string>('none');

  filter = this.reciperFilter.asObservable();

  constructor() { }

  updatedFilterSelection(filter: string) {
    this.reciperFilter.next(filter);
  }

}
