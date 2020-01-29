import {Component, OnInit} from '@angular/core';
import {RecipeListServiceService} from '../recipe-list-service.service';
import {Recipe} from './recipe.model';
import {Subscription} from 'rxjs';

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

  constructor(private recipeListServiceService: RecipeListServiceService) {
    this.newRecipeSubscription = this.recipeListServiceService.getRecipeObservable().subscribe(message => {
      if (message === 'hide') {
        this.showNewRecipe = false;
      } else if (message === 'show') {
        this.showNewRecipe = true;
      }
    });

    this.pushNewRecipeSubscription = this.recipeListServiceService.getPushRecipeObservable().subscribe(newRecipe => {
      console.log(newRecipe);
      this.recipeList.push(newRecipe);
    });

  }

  ngOnInit() {
    this.recipeListServiceService.getJSON().subscribe(data => {
      this.recipeList = data;
    });
  }

  onCreateNewRecipe() {
    this.showNewRecipe = true;
  }

}
