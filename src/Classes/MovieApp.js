import {UIDisplay} from "./UIDisplay";
import {translateMovieTitleToBeSearched} from "../Util";
import {Movie} from "./Movie";


class MovieApp {

    constructor(name) {
        this.name = name;
        this.API_LINK = 'https://www.omdbapi.com/?apikey=60f5adbf&t=';
        this.UiDisplay = new UIDisplay('Movie App Display');
        this.movieToBeSearched = 'Elf';
        this.enteredUrl = this.getApiLink()+ translateMovieTitleToBeSearched(this.movieToBeSearched);
        this.currentMovie = null;
        this.getDataAndUpdateUi().then(r => console.log('Fetching Data complete'));
    }

    async getDataAndUpdateUi() {
        const response = await fetch(this.enteredUrl, {mode: "cors"});
        const fetchedMovieData = await response.json();
        console.log(fetchedMovieData);
        console.log('Fetched Movie Results Below: \n\nMovie Title: ' + fetchedMovieData.Title  + '\nAge Rating: ' + fetchedMovieData.Rated )
        this.currentMovie = new Movie(fetchedMovieData.Title,fetchedMovieData.imdbRating, fetchedMovieData.Actors, fetchedMovieData.Genre);
        this.UiDisplay.updateMovieDetailsOnUi(this.currentMovie.getName());
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