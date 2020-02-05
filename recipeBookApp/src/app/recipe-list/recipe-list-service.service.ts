import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, pipe, Subject, Subscription} from 'rxjs';
import {Recipe} from './recipe.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {snapshotChanges} from '@angular/fire/database';
import {Ingredient} from './ingredient.model';
import {setAnalyticsConfig} from '@angular/cli/models/analytics';
import {filter} from 'rxjs/operators';

export interface FilterSearchQuery {
  filter: string;
  searchQuery: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeListServiceService {
  private newRecipeSubject = new Subject<string>();
  private pushNewRecipeSubject = new Subject<Recipe>();
  createNewRecipeSubscription: Subscription;
  getRecipeListSubject = new BehaviorSubject<Recipe[]>([]);
  openBottomSheetSubject = new BehaviorSubject<Recipe>(null);
  openBottomSheetSubscription: Subscription;

  getFilterRecipeSubject = new BehaviorSubject<FilterSearchQuery>({filter: 'none', searchQuery: ''});
  getFilteredRecipesSubject = new Subject<Recipe[]>();
  getFilterRecipeSubscription: Subscription;

  deleteRecipeSubject = new Subject<Recipe>();
  deleteRecipeSubscription: Subscription;


  constructor(private http: HttpClient, private db: AngularFirestore) {
    this.createNewRecipeSubscription = this.getPushRecipeObservable().subscribe(recipe => {
      this.createRecipe(recipe);
    });

    this.deleteRecipeSubscription = this.getDeleteRecipeObservable().subscribe(recipe => {
      this.deleteRecipe(recipe);
    });

    this.getFilterRecipeSubscription = this.getGetFilterRecipeObservable().subscribe(filterCurr => {

      this.filterRecipesBy(filterCurr).subscribe((recipesValueChanges: Recipe[]) => {
        if (filterCurr.filter === 'none') {
          this.getFilteredRecipesSubject.next(null);
        } else {
          this.getFilteredRecipesSubject.next(recipesValueChanges);
        }
      });

    });

    this.subscribeToRecipeList();
  }

  getOpenBottomSheetObservable(): Observable<Recipe> {
    return this.openBottomSheetSubject.asObservable();
  }

  getGetRecipeListObservable(): Observable<Recipe[]> {
    return this.getRecipeListSubject.asObservable();
  }

  getGetFilterRecipeObservable(): Observable<FilterSearchQuery> {
    return this.getFilterRecipeSubject.asObservable();
  }

  getGetFilteredRecipesObservable(): Observable<Recipe[]> {
    return this.getFilteredRecipesSubject.asObservable();
  }

  getRecipeObservable(): Observable<string> {
    return this.newRecipeSubject.asObservable();
  }

  getDeleteRecipeObservable(): Observable<Recipe> {
    return this.deleteRecipeSubject.asObservable();
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

  createRecipe(data) {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('recipes')
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  getRecipesList() {
    return this.db.collection('recipes').snapshotChanges();
  }

  deleteRecipe(recipeData: Recipe) {
    return this.db
      .collection('recipes')
      .doc(recipeData.id)
      .delete();
  }


  filterRecipesBy(filterSearch: FilterSearchQuery) {
    return this.db.collection('recipes', ref => ref.where('type', '==', filterSearch.filter)).valueChanges();
  }

  firebaseToRecipes(item) {
    return {
      id: item.payload.doc.id,
      name: item.payload.doc.data().name,
      type: item.payload.doc.data().type,
      ingredients: item.payload.doc.data().ingredients
    };
  }

  subscribeToRecipeList() {
    this.getRecipesList().subscribe((recipesSnapshot) => {
      const recipeList: Recipe[] = recipesSnapshot.map((recipe: any) => {
        return this.firebaseToRecipes(recipe);
      });

      this.getRecipeListSubject.next(recipeList);
    });
  }
}

