import {UIDisplay} from "./UIDisplay";
import {translateMovieTitleToBeSearched} from "../Util";
import {Movie} from "./Movie";


require('dotenv').config();

class MovieApp {



    constructor(name) {
        this.name = name;
        this.API_LINK = process.env.OMDB_API_KEY;
        this.POPULAR_MOVIES_API_LINK = process.env.TMDB_API_KEY;
        this.UiDisplay = new UIDisplay('Movie App Display');
        this.movieToBeSearched = 'Riders of Justice';
        this.enteredUrl = this.getApiLink()+ translateMovieTitleToBeSearched(this.movieToBeSearched);
        this.currentSelectedMovie = null;
        this.getMovieDataAndUpdateUi().then(r => console.log('Fetching Data complete'));
        this.getPopularMovies().then(r => console.log('Successfully fetched popular movies.'));
    }

    async getPopularMovies() {
        const displayedMovieDiv = document.getElementById('displayedMoviesDiv');
        displayedMovieDiv.innerHTML = '';
        const response = await fetch(this.POPULAR_MOVIES_API_LINK, {mode: "cors"});
        const fetchedPopularMovies = await response.json();
        console.log(fetchedPopularMovies);
        let counter = 0;
        fetchedPopularMovies.results.forEach((currentPopularMovie) => {
            if (counter === 12) {
                return;
            }
            console.log(currentPopularMovie.original_title);
            counter ++;
            const posterPath = currentPopularMovie.poster_path;
            const baseUrl = "https://image.tmdb.org/t/p/w500"; // You can change 'w500' to other sizes as needed
            const fullPosterUrl = `${baseUrl}${posterPath}`;
            displayedMovieDiv.appendChild(this.UiDisplay.buildDisplayedMovieComponent(currentPopularMovie.original_title, fullPosterUrl));
        });
    }

    async getMovieDataAndUpdateUi() {
        const response = await fetch(this.enteredUrl, {mode: "cors"});
        const fetchedMovieData = await response.json();
        console.log(fetchedMovieData);
        console.log('Fetched Movie Results Below: \n\nMovie Title: ' + fetchedMovieData.Title  + '\nAge Rating: ' + fetchedMovieData.Rated )
        this.setCurrentSelectedMovie(new Movie(fetchedMovieData.Title,fetchedMovieData.imdbRating, fetchedMovieData.Actors, fetchedMovieData.Genre, fetchedMovieData.Poster, fetchedMovieData.Plot, fetchedMovieData.Rated, fetchedMovieData.Runtime, fetchedMovieData.Released.slice(-4), fetchedMovieData));
        this.UiDisplay.updateMovieDetailsOnUi(this.getCurrentSelectedMovie());
    }

    getMovieToBeSearched() {
        return this.movieToBeSearched;
    }

    setEnteredUrl() {
        this.enteredUrl = this.getApiLink() + translateMovieTitleToBeSearched(this.getMovieToBeSearched());
    }

    setMovieToBeSearched(movieToBeSearched) {
        this.movieToBeSearched = movieToBeSearched;
    }

    getApiLink() {
        return this.API_LINK;
    }

    setCurrentSelectedMovie(newMovie) {
        this.currentSelectedMovie = newMovie;
    }

    getCurrentSelectedMovie() {
        return this.currentSelectedMovie;
    }
}

export {MovieApp};