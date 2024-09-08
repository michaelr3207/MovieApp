import Star from '../Images/3cb5d19f756bc95af4354a32797c7149.jpg'

class UIDisplay {

    constructor(name) {
        this.name = name;
        this.setStarImage();
    }

    setStarImage() {
        const starImage = new Image();
        starImage.src = Star;
        document.getElementById('starImage').innerHTML = ''
        document.getElementById('starImage').append(starImage);
    }

    updateMovieDetailsOnUi(currentMovie) {
        document.getElementById('movieTitleDiv').innerHTML = currentMovie.getMovieName();
        document.getElementById('rating').innerHTML = currentMovie.getMovieRating();
        document.getElementById('castDescription').innerHTML = currentMovie.getMovieCast();
        document.getElementById('plotDescription').innerHTML = currentMovie.getMoviePlot();
        document.getElementById('imageContainer').innerHTML = '';
        document.getElementById('ageRating').innerHTML = currentMovie.getAgeRating();
        document.getElementById('releaseDate').innerHTML = currentMovie.getReleaseDate();
        document.getElementById('movieLength').innerHTML = currentMovie.getMovieLength();
        document.getElementById('imageContainer').append(currentMovie.getMoviePoster());
        this,this.buildGenreComponentsAndAddToUI(currentMovie);
    }

    buildGenreComponentsAndAddToUI(currentMovie) {
        const movieGenreDiv = document.getElementById('movieGenreContainer');
        movieGenreDiv.innerHTML = ''
        for(let index = 0; index < currentMovie.getGenres().length; index ++) {
            const movieGenreElement = document.createElement('div')
            movieGenreElement.className = 'movieGenreContainer';
            movieGenreElement.innerHTML = currentMovie.getGenres().at(index);
            movieGenreDiv.append(movieGenreElement);
        }
    }

}

export {UIDisplay};