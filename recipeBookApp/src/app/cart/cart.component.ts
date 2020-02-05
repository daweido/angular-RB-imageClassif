import {Component, OnInit} from '@angular/core';
import {CartServiceService} from './cart-service.service';
import {Subscription} from 'rxjs';
import {Ingredient} from '../recipe-list/ingredient.model';
import {Recipe} from '../recipe-list/recipe.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ingredientsList: Ingredient[] = [];
  pushToCartSubscription: Subscription;

  constructor(private cartService: CartServiceService) {
    this.pushToCartSubscription = this.cartService.getAddRecipeObservable().subscribe(recipe => {

      this.mergeToCart(recipe);
    });
  }

  ngOnInit() {
  }

  mergeToCart(recipe: Recipe) {
    const newIngredients = recipe.ingredients;

    for (const ingredient of newIngredients) {
      const index = this.ingredientsList.findIndex(currIng => currIng.name === ingredient.name);

      if (index !== -1) {
        this.ingredientsList[index].quantity += ingredient.quantity;
      } else {
        this.ingredientsList.push(ingredient);
      }
    }
  }


}
