// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  user: any = localStorage.getItem('user');
  favorites: any[] = JSON.parse(localStorage.getItem('user_favorites') || '[]');

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    //  this.getFavoriteMovies();
  }

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * Gets favorite movies from api call and sets the favorite movies variable to return JSON file
   * @returns array holding ids of user's favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * checks if a movie is included in the user's list of favorite movies
   * @param id
   * @returns true, if the movie is a favorite move, else false
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  /**
   * opens the user genre dialog from GenreComponent to displaying details
   * @param name
   * @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * opens the user director dialog from DirectorComponent to displaying details
   * @param name
   * @param bio
   * @param birthday
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  /**
   * adds a movie to the list of favorite movies via an API call
   * @param title
   * @function addFavoriteMovie
   */
  addToFavoriteMovies(title: string): void {
    console.log(title);
    this.fetchApiData.addFavouriteMovie(title).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id
   * @function removeFavoriteMovie
   */
  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * This function is used to add a movie to the user's favorites or remove
   * @function toggleFavorite
   */

  toggleFavorite(movie: any): void {
    console.log(movie);
    if (this.favorites.includes(movie)) {
      this.favorites = this.favorites.filter((item) => item !== movie);
      localStorage.setItem('user_favorites', JSON.stringify(this.favorites));
      this.fetchApiData
        .removeFavoriteMovie(movie)
        .subscribe((resp: any) => {
          this.snackBar.open('Movie Removed from Favorites', 'OK', {
            duration: 2000,
          });
        });
    } else {
      this.favorites.push(movie);
      localStorage.setItem('user_favorites', JSON.stringify(this.favorites));
      this.fetchApiData.addFavouriteMovie(movie).subscribe((resp: any) => {
        this.snackBar.open('Movie Added to Favorites', 'OK', {
          duration: 2000,
        });
      });
    }
  }
}
