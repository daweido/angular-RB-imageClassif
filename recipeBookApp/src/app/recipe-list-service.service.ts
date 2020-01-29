import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Recipe} from './recipe-list/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeListServiceService {
  private newRecipeSubject = new Subject<string>();
  private pushNewRecipeSubject = new Subject<Recipe>();

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://localhost:4200/assets/recipeData.json');
  }

  getRecipeObservable(): Observable<string> {
    return this.newRecipeSubject.asObservable();
  }

  clearNewRecipe() {
    this.newRecipeSubject.next('hide');
  }

  showNewRecipe() {
    this.newRecipeSubject.next('show');
  }

  getPushRecipeObservable(): Observable<Recipe> {
    return this.pushNewRecipeSubject.asObservable();
  }

  pushNewRecipe(newRecipe: Recipe) {
    this.pushNewRecipeSubject.next(newRecipe);
  }
}
