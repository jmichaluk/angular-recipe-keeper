import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    IngredientsComponent,
    RecipeDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
