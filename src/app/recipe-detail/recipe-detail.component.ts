import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})


export class RecipeDetailComponent implements OnInit {

  @Input() recipe?: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  save(): void {
    if (this.recipe) {
      this.recipeService.updateRecipe(this.recipe)
      .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

}
