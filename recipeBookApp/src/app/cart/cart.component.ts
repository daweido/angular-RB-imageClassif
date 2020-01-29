import {Component, OnInit} from '@angular/core';
import {CartServiceService} from './cart-service.service';
import {Subscription} from 'rxjs';
import {Ingredient} from '../recipe-list/ingredient.model';

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

      this.ingredientsList = this.ingredientsList.concat(recipe.ingredients);
    });
  }

  ngOnInit() {
  }


}
