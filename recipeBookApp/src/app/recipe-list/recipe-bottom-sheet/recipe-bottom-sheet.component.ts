import { Component, OnInit } from '@angular/core';
import {RecipeListServiceService} from '../recipe-list-service.service';
import {Recipe} from '../recipe.model';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-recipe-bottom-sheet',
  templateUrl: './recipe-bottom-sheet.component.html',
  styleUrls: ['./recipe-bottom-sheet.component.css']
})
export class RecipeBottomSheetComponent implements OnInit {

  currentRecipe: Recipe;

  constructor(
    private recipeListServiceService: RecipeListServiceService) {}

  ngOnInit() {
    this.recipeListServiceService.getOpenBottomSheetObservable().subscribe((recipe: Recipe) => {
      this.currentRecipe = recipe;
    });
  }
}
