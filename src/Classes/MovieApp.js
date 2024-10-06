import {UIDisplay} from "./UIDisplay";
import {MAX_PAGE_VALUE, POPULAR_OPTION, translateMovieTitleToBeSearched, TRENDING_OPTION} from "../Util";
import {Movie} from "./Movie";

require('dotenv').config();

class MovieApp {

    constructor(name) {
        this.name = name;
        this.API_LINK = process.env.OMDB_API_KEY;
        this.POPULAR_MOVIES_API_LINK = process.env.TMDB_POPULAR_KEY;
        this.TRENDING_MOVIES_API_LINK = process.env.TMDB_TRENDING_KEY;
        this.UiDisplay = new UIDisplay('Movie App Display', this);
        this.movieToBeSearched = 'Riders of Justice';
        this.enteredUrl = this.getApiLink() + translateMovieTitleToBeSearched(this.movieToBeSearched);
        this.currentSelectedMovie = null;
        this.currentSetSearchSetting = null
        this.numberOfDisplayedMovies = null;
        this.getMovieDataAndUpdateUi().then(r => console.log('Fetching Data complete'));
        this.getPopularMovies().then(r => console.log('Successfully fetched popular movies.'));
    }



    getCurrentSetSearchSetting() {
        return this.currentSetSearchSetting;
    }

    setCurrentSetSearchSetting(option) {
        this.currentSetSearchSetting = option;
    }

    setNumberOfDisplayedMovies(number) {
        this.numberOfDisplayedMovies = number;
    }

    getNumberOfDisplayedMovies() {
        return this.numberOfDisplayedMovies;
    }

    async getTrendingMovies() {
        let counter = 0;
        this.setNumberOfDisplayedMovies(counter);
        this.setCurrentSetSearchSetting(TRENDING_OPTION);
        this.UiDisplay.setDisplayedMoviesHeaderTitle(this.getCurrentSetSearchSetting());
        const response = await fetch(this.TRENDING_MOVIES_API_LINK, {mode: "cors"});
        const fetchedPopularMovies = await response.json();
        fetchedPopularMovies.results.forEach((currentTrendingMovie) => {
            if (this.getNumberOfDisplayedMovies() === MAX_PAGE_VALUE) {
                this.UiDisplay.unlockScrollBar();
            }
            counter ++;
            this.setNumberOfDisplayedMovies(counter);
            this.UiDisplay.addMovieComponent(currentTrendingMovie);
        });
    }


    async getPopularMovies() {
        let counter = 0;
        this.setNumberOfDisplayedMovies(counter);
        this.setCurrentSetSearchSetting(POPULAR_OPTION);
        this.UiDisplay.setDisplayedMoviesHeaderTitle(this.getCurrentSetSearchSetting())
        const response = await fetch(this.POPULAR_MOVIES_API_LINK, {mode: "cors"});
        const fetchedPopularMovies = await response.json();
        fetchedPopularMovies.results.forEach((currentPopularMovie) => {
            if (this.getNumberOfDisplayedMovies() === MAX_PAGE_VALUE) {
                this.UiDisplay.unlockScrollBar();
            }
            counter ++;
            this.setNumberOfDisplayedMovies(counter);
            this.UiDisplay.addMovieComponent(currentPopularMovie);
        });
    }

    async getMovieDataAndUpdateUi() {
        const response = await fetch(this.enteredUrl, {mode: "cors"});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedMovieData = await response.json();
        console.log(fetchedMovieData);
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