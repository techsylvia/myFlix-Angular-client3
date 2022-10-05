import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://sylvmovieapp.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 //Using this.http, it posts it to the API endpoint and returns the API's response.
  constructor(private http: HttpClient) {}

  /**
   * calls API endpoint to register a new user
   * @param userDetails
   * @returns a new user object in JSON format
   */

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {  //TypeScript type cast.
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe( //function from RxJS, used to combine multiple functions into a single function
    catchError(this.handleError)
    );
  }

    /**
   * calls API endpoint to login an existing user
   * @param userDetails
   * @returns data of the user in JSON format
   */

  public UserLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
  // API call to get all movies

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
 
 /**
   * calls API endpoint to get data on a single movie specified by its title
   * @param title
   * @returns JSON object holding movie data
   */

  public getMovie(Title:any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + Title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
   * calls API endpoint to get data on a director
   * @param name
   * @returns JSON obejct holding director data
   */

  public getDirector(Director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + Director, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get data on a genre
   * @param name
   * @returns JSON object holding genre data
   */

  public getGenre(Genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + Genre, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */

  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
   * calls API endpoint to get list of favorite movies of this user
   * @returns list of the user's favorite movies in JSON format
   */

public getFavouriteMovies(): Observable<any> {
    const token  = localStorage.getItem('token');
const username = localStorage.getItem('Username');
return this.http.get(apiUrl + 'users/' + username + '/movies', {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + token,
  })
}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
 /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */

  public addFavouriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .post(apiUrl + 'users/' + username + '/movies/' + id, '', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
  }).pipe(map(this.extractResponseData), catchError(this.handleError));
}

/**
   * calls API endpoint to allow user to update their user information
   * @param updateDetails
   * @returns JSON object holding data about the updated user
   */


public editUser(updateDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
  .put(apiUrl + 'users/' + username, updateDetails, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
  }),
}).pipe(map(this.extractResponseData), catchError(this.handleError));
} 

 /**
   * calls API endpoint to deregister an existing user
   * @returns	A success message indicating that the profile was successfully deleted.
   */

public deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
  .delete(apiUrl + 'users/' + username, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }),
  }).pipe(map(this.extractResponseData), catchError(this.handleError));
}

 /**
   * calls API endpoint to delete a movie from the user's list of favorite movies
   * @param movieID
   * @returns JSON object holding data about the updated user
   */

public removeFavoriteMovie(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
  .delete(apiUrl + 'users/' + username + '/movies/' + id, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }),
  }).pipe(map(this.extractResponseData), catchError(this.handleError));
}

 /**
   * extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */
  
  // Non-typed response extraction
  private extractResponseData(res: any): any { // any var Response
    const body = res;
    return body || { };
  }

  /**
   * handles errors
   * @param error
   * @returns error message
   */

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}