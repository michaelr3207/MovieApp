import {UIDisplay} from "./UIDisplay";
import {translateMovieTitleToBeSearched} from "../Util";
import {Movie} from "./Movie";


class MovieApp {

    constructor(name) {
        this.name = name;
        this.API_LINK = 'https://www.omdbapi.com/?apikey=60f5adbf&t=';
        this.UiDisplay = new UIDisplay('Movie App Display');
        this.movieToBeSearched = 'Riders of Justice';
        this.enteredUrl = this.getApiLink()+ translateMovieTitleToBeSearched(this.movieToBeSearched);
        this.currentSelectedMovie = null;
        this.getMovieDataAndUpdateUi().then(r => console.log('Fetching Data complete'));
    }

    async getMovieDataAndUpdateUi() {
        const response = await fetch(this.enteredUrl, {mode: "cors"});
        const fetchedMovieData = await response.json();
        console.log(fetchedMovieData);
        console.log('Fetched Movie Results Below: \n\nMovie Title: ' + fetchedMovieData.Title  + '\nAge Rating: ' + fetchedMovieData.Rated )
        this.setCurrentSelectedMovie(new Movie(fetchedMovieData.Title,fetchedMovieData.imdbRating, fetchedMovieData.Actors, fetchedMovieData.Genre, fetchedMovieData.Poster, fetchedMovieData.Plot));
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