import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Recipe} from '../recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private addRecipeToCartSubject = new Subject<Recipe>();

  constructor() { }


  public getAddRecipeObservable(): Observable<Recipe> {
    return this.addRecipeToCartSubject.asObservable();
  }

  addRecipeToCart(recipe: Recipe) {
    this.addRecipeToCartSubject.next(recipe);
  }

}
