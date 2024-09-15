import {UIDisplay} from "./UIDisplay";
import {translateMovieTitleToBeSearched} from "../Util";
import {Movie} from "./Movie";


class MovieApp {

    constructor(name) {
        this.name = name;
        this.API_LINK = 'https://www.omdbapi.com/?apikey=60f5adbf&t=';
        this.SECOND_API_LINK = 'https://api.themoviedb.org/3/search/movie?api_key=ed48037faa2f5e8e12ca9c7f0cc79238&query=I+Am+Legend';
        this.POPULAR_MOVIES_API_LINK = 'https://api.themoviedb.org/3/movie/popular?api_key=ed48037faa2f5e8e12ca9c7f0cc79238';
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