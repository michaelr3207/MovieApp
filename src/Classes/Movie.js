

class Movie {

    constructor(name, rating, cast, genre, posterSource, moviePlot) {
        this.name = name;
        this.rating = rating;
        this.cast = cast;
        this.genre = genre;
        this.moviePoster = new Image();
        this.moviePoster.src = posterSource;
        this.moviePlot = moviePlot;
    }

    getMoviePlot() {
        return this.moviePlot;
    }

    getMovieCast() {
        return this.cast;
    }
    getMovieName() {
        return this.name;
    }

    getMovieRating() {
        return this.rating;
    }

    getCast() {
        return this.cast;
    }

    getGenre() {
        return this.genre;
    }

    getMoviePoster() {
        return this.moviePoster;
    }

}
export  {Movie};