import {Component, OnInit} from '@angular/core';
import {RecipeListServiceService} from '../recipe-list-service.service';
import {Ingredient} from '../recipe-list/ingredient.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  newRecipeForm: FormGroup;
  ingredients: FormArray;

  constructor(private recipeListServiceService: RecipeListServiceService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newRecipeForm = this.formBuilder.group({
      name: '',
      type: '',
      ingredients: this.formBuilder.array([this.createIngredient()])
    });
  }

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      name: '',
      quantity: 0
    });
  }

  hideNewRecipe() {
    this.newRecipeForm.reset();
    this.recipeListServiceService.clearNewRecipe();
  }

  addIngredient() {
    this.ingredients = this.newRecipeForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  onSubmit(RecipeData) {
    this.hideNewRecipe();
    this.recipeListServiceService.pushNewRecipe(RecipeData);
  }
}
