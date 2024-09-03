import {UIDisplay} from "./UIDisplay";
import {translateMovieTitleToBeSearched} from "../Util";


class MovieApp {

    constructor(name) {
        this.name = name;
        this.API_LINK = 'https://www.omdbapi.com/?apikey=60f5adbf&t=';
        this.UiDisplay = new UIDisplay('Movie App Display');
        this.movieToBeSearched = 'I am Legend';
        this.enteredUrl = this.API_LINK + translateMovieTitleToBeSearched(this.movieToBeSearched);
        this.response = this.getData();
        this.fetchedJson = null;
    }

    async getData() {
        const response = await fetch(this.enteredUrl, {mode: "cors"});
        const fetchedMovieData = await response.json();
        console.log(fetchedMovieData);
        console.log('Fetched Movie Results Below: \n\nMovie Title: ' + fetchedMovieData.Title  + '\nAge Rating: ' + fetchedMovieData.Rated )
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