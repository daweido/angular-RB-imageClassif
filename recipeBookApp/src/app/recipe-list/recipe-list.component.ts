import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilterSearchQuery, RecipeListServiceService} from './recipe-list-service.service';
import {Recipe} from './recipe.model';
import {Subject, Subscription} from 'rxjs';
import {CartServiceService} from '../cart/cart-service.service';
import {Ingredient} from './ingredient.model';
import {MatBottomSheet} from '@angular/material';
import {RecipeBottomSheetComponent} from './recipe-bottom-sheet/recipe-bottom-sheet.component';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipeList: Recipe[];
  private showNewRecipe = false;
  newRecipeSubscription: Subscription;
  currentFilter: FilterSearchQuery = {filter: 'none', searchQuery: ''};
  recipeFilteredList: Recipe[] = this.recipeList;
  @ViewChild('recipeSearchInput', {static: false}) searchInput: ElementRef;


  constructor(
    private recipeListServiceService: RecipeListServiceService,
    private cartService: CartServiceService,
    private bottomSheet: MatBottomSheet) {


    this.newRecipeSubscription = this.recipeListServiceService.getRecipeObservable().subscribe(message => {
      if (message === 'hide') {
        this.showNewRecipe = false;
      } else if (message === 'show') {
        this.showNewRecipe = true;
      }
    });


  }

  async ngOnInit() {

    await this.getRecipesList();

    this.recipeListServiceService.getGetFilterRecipeObservable().subscribe(filter => {
      this.currentFilter = filter;
    });

    this.recipeListServiceService.getGetFilteredRecipesObservable().subscribe(recipes => {
      if (recipes) {
        this.recipeFilteredList = recipes;
      } else {
        this.recipeFilteredList = this.recipeList;
      }

      const search = this.recipeListServiceService.getFilterRecipeSubject.value.searchQuery;

      if (search !== '') {
        this.recipeFilterByQuery(search);
      }
    });
  }

  recipeFilterByQuery(query: string) {
      this.recipeFilteredList = this.recipeFilteredList.filter((recipe: Recipe) => {
        const ingredients = recipe.ingredients.filter((ingredient: Ingredient) => {
          return ingredient.name.toLowerCase().includes(query);
        });

        return recipe.name.toLowerCase().includes(query) || ingredients.length !== 0;

      });

  }


  getRecipesList() {
    this.recipeListServiceService.getGetRecipeListObservable().subscribe((recipes: Recipe[]) => {
      this.recipeList = recipes;
      this.recipeFilteredList = this.recipeList;
    });


  }

  onCreateNewRecipe() {
    this.recipeListServiceService.showNewRecipe();
  }

  addRecipeToCart(recipe: Recipe) {
    this.cartService.addRecipeToCart(recipe);
  }

  setFilter(filterSelect: string) {
    const filterSearch: FilterSearchQuery = {
      filter: filterSelect,
      searchQuery: this.searchInput.nativeElement.value.toLowerCase()
    };

    this.recipeListServiceService.getFilterRecipeSubject.next(filterSearch);
  }

  onDeleteRecipe(recipe) {
    this.recipeListServiceService.deleteRecipeSubject.next(recipe);
  }

  searchRecipes($event) {
    const searchQueryCurr = $event.target.value.toLowerCase();

    const filterSearch: FilterSearchQuery = {
      filter: this.currentFilter.filter,
      searchQuery: searchQueryCurr
    };

    this.recipeListServiceService.getFilterRecipeSubject.next(filterSearch);
  }

  openBottomSheetRecipe(recipe: Recipe) {
    this.recipeListServiceService.openBottomSheetSubject.next(recipe);
    this.bottomSheet.open(RecipeBottomSheetComponent);
  }
}

