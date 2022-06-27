import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const recipes = [
      { id: 12, name: 'Grilled Cheese', source: "N/A", rating: 3},
      { id: 13, name: 'Chicken Pot Pie', source: 'e-mail', rating: 4 },
      { id: 14, name: 'Sweet Potato Sushi Bowl', source: 'Chefs Plate', rating: 5 }, 
      { id: 15, name: 'Fish Tacos', source: 'Chefs Plate', rating: 5},
      { id: 16, name: 'Turkey Sloppy Joes', source: 'Website', rating: 5}
    ];
    return { recipes }
  }

  // Overrides the genId method to ensure that a recipe always has an id.
  // If the recipe array is empty the method below returns the initial number.
  // If the recipe array is not empty the method returns the highest hero id + 1.
  genId(recipes: Recipe[]): number {
    return recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 11;
  }
}
