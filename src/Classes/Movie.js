

class Movie {

    constructor(name, rating, cast, genre) {
        this.name = name;
        this.rating = rating;
        this.cast = cast;
        this.genre = genre;
    }

    getName() {
        return this.name;
    }

    getRating() {
        return this.rating;
    }

    getCast() {
        return this.cast;
    }

    getGenre() {
        return this.genre;
    }

}
export  {Movie};