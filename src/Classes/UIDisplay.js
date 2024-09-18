import Star from '../Images/3cb5d19f756bc95af4354a32797c7149.jpg'
import Logo from  '../Images/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
import {addEventListenerToDisplayedMovie} from "../index";

class UIDisplay {

    constructor(name) {
        this.name = name;
        this.setUiImages();
    }

    setUiImages() {
        const starImage = new Image();
        const logoImage = new Image();
        starImage.src = Star;
        logoImage.src = Logo;
        document.getElementById('starImage').innerHTML = ''
        document.getElementById('starImage').append(starImage);
        document.getElementById('logoDiv').innerHTML = ''
        document.getElementById('logoDiv').append(logoImage);
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

    setDisplayedMoviesHeaderTitle(currentSelectedGenre) {
        document.getElementById('container2TitleDiv').innerHTML = currentSelectedGenre;
    }

    buildDisplayedMovieComponent(movieTitle, moviePoster) {
        const displayedMovieDiv = document.createElement('div');
        displayedMovieDiv.className = 'displayedMovie';
        displayedMovieDiv.id = movieTitle.toString();
        const moviePosterImage = new Image();
        moviePosterImage.src = moviePoster;
        displayedMovieDiv.appendChild(moviePosterImage);
        addEventListenerToDisplayedMovie(displayedMovieDiv);

        return displayedMovieDiv;
    }

    hideMainScreenAndShowMovieInfoScreen() {
        document.getElementById('topRatedPopularDiv').className = 'hide';
        document.getElementById('movieInfoDiv').className = 'container';
    }

    hideInfoScreenAndShowMainScreen() {
        document.getElementById('topRatedPopularDiv').className = 'popularAndTopRatedContainer';
        document.getElementById('movieInfoDiv').className = 'hide';
    }

}

export {UIDisplay};