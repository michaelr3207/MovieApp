import {UIDisplay} from "./UIDisplay";


class MovieApp {

    constructor(name) {
        this.name = name;
        this.API_LINK = 'https://www.omdbapi.com/?apikey=60f5adbf&t=';
        this.UiDisplay = new UIDisplay('Movie App Display');
        this.currentSelectedMovie = null;
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