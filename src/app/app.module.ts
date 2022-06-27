import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here
import { InMemoryDataService } from './in-memory-data.service';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    IngredientsComponent,
    RecipeDetailComponent,
    MessagesComponent,
    DashboardComponent,
    RecipeSearchComponent
  ],
  imports: [
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule intercepts HTTP requests and
    // returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
