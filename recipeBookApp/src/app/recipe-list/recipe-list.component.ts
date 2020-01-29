import {Component, OnInit} from '@angular/core';
import {RecipeListServiceService} from './recipe-list-service.service';
import {Recipe} from './recipe.model';
import {Subscription} from 'rxjs';
import {CartServiceService} from '../cart/cart-service.service';
import {RecipeFilterService} from './recipe-filter.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipeList: Recipe[];
  private showNewRecipe = false;
  newRecipeSubscription: Subscription;
  pushNewRecipeSubscription: Subscription;
  currentFilter = 'none';
  recipeFilteredList: Recipe[] = this.recipeList;

  constructor(private recipeListServiceService: RecipeListServiceService, private cartService: CartServiceService, private recipeFilterService: RecipeFilterService) {


    this.newRecipeSubscription = this.recipeListServiceService.getRecipeObservable().subscribe(message => {
      if (message === 'hide') {
        this.showNewRecipe = false;
      } else if (message === 'show') {
        this.showNewRecipe = true;
      }
    });


    this.pushNewRecipeSubscription = this.recipeListServiceService.getPushRecipeObservable().subscribe(newRecipe => {
      this.recipeList.push(newRecipe);
    });
  }

  ngOnInit() {
    this.recipeListServiceService.getJSON().subscribe(data => {
      this.recipeList = data;
      this.recipeFilteredList = this.recipeList;
    });



    this.recipeFilterService.filter.subscribe(filter => {
      this.currentFilter = filter;

      if (this.currentFilter === 'none') {
        this.recipeFilteredList = this.recipeList;
      } else {
        this.recipeFilteredList = this.recipeList.filter(recipe => recipe.type === this.currentFilter);
      }
    });
  }

  onCreateNewRecipe() {
    this.recipeListServiceService.showNewRecipe();
  }

  addRecipeToCart(recipe: Recipe) {
    this.cartService.addRecipeToCart(recipe);
  }

  setFilter(filter: string) {
    this.recipeFilterService.updatedFilterSelection(filter);
  }
}
