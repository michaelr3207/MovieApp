import Star from '../Images/3cb5d19f756bc95af4354a32797c7149.jpg'
import Logo from  '../Images/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
import {MovieApp} from "./MovieApp";

class UIDisplay {

    constructor(name, movieApp) {
        this.name = name;
        this.movieApp = movieApp;
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

    addMovieComponent(currentMovie) {
        const displayedMovieDiv = document.getElementById('displayedMoviesDiv');
        const posterPath = currentMovie.poster_path;
        const baseUrl = "https://image.tmdb.org/t/p/w500"; // You can change 'w500' to other sizes as needed
        const fullPosterUrl = `${baseUrl}${posterPath}`;
        displayedMovieDiv.appendChild(this.buildDisplayedMovieComponent(currentMovie.original_title, fullPosterUrl, this.movieApp));
    }

    setDisplayedMoviesHeaderTitle(currentSelectedGenre) {
        document.getElementById('container2TitleDiv').innerHTML = currentSelectedGenre;
        const displayedMovieDiv = document.getElementById('displayedMoviesDiv');
        displayedMovieDiv.innerHTML = '';
    }

    addEventListenerToDisplayedMovie(displayedMovie, movieApp) {
        displayedMovie.addEventListener("click", () => {
            movieApp.setMovieToBeSearched(displayedMovie.id);
            movieApp.setEnteredUrl();
            movieApp.getMovieDataAndUpdateUi().then(r => console.log('Fetching complete! You clicked: ' + mouseEvent.target.id));
            movieApp.UiDisplay.hideMainScreenAndShowMovieInfoScreen();
        });
    }


    buildDisplayedMovieComponent(movieTitle, moviePoster, movieApp) {
        const displayedMovieDiv = document.createElement('div');
        displayedMovieDiv.className = 'displayedMovie';
        displayedMovieDiv.id = movieTitle.toString();
        const moviePosterImage = new Image();
        moviePosterImage.src = moviePoster;
        displayedMovieDiv.appendChild(moviePosterImage);
        this.addEventListenerToDisplayedMovie(displayedMovieDiv, movieApp);

        return displayedMovieDiv;
    }

    unlockScrollBar() {
        document.getElementById('body').style.height = 'auto';
        document.getElementById('displayedMoviesDiv').style.height = 'auto';
    }

    checkIfThereAreMoreThanTwelveMovies() {

    }

    hideMainScreenAndShowMovieInfoScreen() {
        document.getElementById('body').style.height = '100%';
        document.getElementById('topRatedPopularDiv').className = 'hide';
        document.getElementById('movieInfoDiv').className = 'container';
    }

    hideInfoScreenAndShowMainScreen() {
        document.getElementById('body').style.height = 'auto';
        document.getElementById('topRatedPopularDiv').className = 'popularAndTopRatedContainer';
        document.getElementById('movieInfoDiv').className = 'hide';
    }

}

export {UIDisplay};