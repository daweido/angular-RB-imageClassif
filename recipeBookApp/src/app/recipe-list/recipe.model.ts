import {Ingredient} from './ingredient.model';

export class Recipe {
  id: string;
  type: string;
  name: string;
  ingredients: Ingredient[];
}
