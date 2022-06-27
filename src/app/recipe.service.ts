import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Recipe } from './recipe'
import { RECIPES } from './mock-recipes'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a RecipeService message with theMessageService */
  private log (message: string) {
    this.messageService.add(`RecipeService: ${message}`);
  }

  private recipesUrl = 'api/recipes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
        catchError(this.handleError<Recipe[]>('getRecipes', []))
      );
  }

  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  /** PUT: update the recipe on the server */
  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap(_ => this.log(`updated recipe id=${recipe.id}`)),
      catchError(this.handleError<any>('updateRecipe'))
    );
  }

  /** POST: add a new recipe to the servier */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap((newRecipe: Recipe) => this.log(`added recipe w/ id=${newRecipe.id}`)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE: delete the recipe from the server */
  deleteRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;

    return this.http.delete<Recipe>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted recipe id=${id}`)),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  /* GET recipes whose name contains search term */
  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      // if not search term, return empty recipe array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.recipesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found recipes matching "${term}"`) :
        this.log(`no recipes matching "${term}"`)),
        catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of traansforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
