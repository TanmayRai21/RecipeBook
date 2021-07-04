import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Diwali Recipe',
      'This is my Diwali recipe',
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg',
      [
        new Ingridient('Potato', 4),
        new Ingridient('wheat floor', 200),
        new Ingridient('Oil', 100),
        new Ingridient('Coriander', 50),
        new Ingridient('Salt', 2)
      ]
    ),
    new Recipe(
      'New Year Recipe',
      'This is my New Year recipe',
      'https://www.vegrecipesofindia.com/wp-content/uploads/2014/02/carrot-halwa-recipe-2-500x500.jpg',
      [
        new Ingridient('Carrot', 20),
        new Ingridient('Cashew', 50),
        new Ingridient('Milk', 2),
        new Ingridient('Raisins', 50),
        new Ingridient('Sugar', 1)
      ]
    ),
    new Recipe(
      'Holi Recipe',
      'This is my Holi recipe',
      'https://images.hindustantimes.com/img/2021/03/24/1600x900/pjimage_(58)_1616588969281_1616588980065.jpg',
      [
        new Ingridient('Cheese', 4),
        new Ingridient('wheat floor', 200),
        new Ingridient('Oil', 50),
        new Ingridient('Tomatoes', 5),
        new Ingridient('Salt', 2)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // to return a copy and not actual reference
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngridientsToShoppingList(ingridients: Ingridient[]) {
    this.slService.addIngridients(ingridients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
