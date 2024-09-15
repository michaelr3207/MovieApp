// "This [website, program, service, application, product] uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB


class Movie {

    constructor(name, rating, cast, movieGenres, posterSource, moviePlot, ageRating, movieLength, releaseDate) {
        this.name = name;
        this.rating = rating;
        this.cast = cast;
        this.genres = movieGenres.split(',');
        this.moviePoster = new Image();
        this.moviePoster.src = posterSource;
        this.moviePlot = moviePlot;
        this.ageRating = ageRating;
        this.movieLength = movieLength;
        this.releaseDate = releaseDate;
    }


    getReleaseDate() {
        return this.releaseDate;
    }

    getMovieLength() {
        return this.movieLength;
    }

    getAgeRating() {
        return this.ageRating;
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

    getGenres() {
        return this.genres;
    }

    getMoviePoster() {
        return this.moviePoster;
    }

}
export  {Movie};