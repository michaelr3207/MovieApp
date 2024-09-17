import './style.css'
import {MovieApp} from "./Classes/MovieApp";
import {translateMovieTitleToBeSearched} from "./Util";

const movieApp = new MovieApp('Simple Movie App');

function main() {
     addEventListenerToSearchButton(movieApp);
     addEventListenToCloseButtonAndIcon();
}

function addEventListenerToSearchButton(movieApp) {
     const searchButton = document.getElementById('searchButton');
     searchButton.addEventListener("click", () => {
        const movieEnteredByUser = document.getElementById('searchInput').value;
        console.log('Entered value from search bar: ' + movieEnteredByUser);
        movieApp.setMovieToBeSearched(movieEnteredByUser);
        movieApp.setEnteredUrl();
        movieApp.getMovieDataAndUpdateUi()
            .then(r => console.log('Fetching Data after user search complete'));
            // .catch((error) => {console.log(error)});
     });
}

function addEventListenerToDisplayedMovie(displayedMovie) {
    displayedMovie.addEventListener("click", () => {
        movieApp.setMovieToBeSearched(displayedMovie.id);
        movieApp.setEnteredUrl();
        movieApp.getMovieDataAndUpdateUi().then(r => console.log('Fetching complete! You clicked: ' + mouseEvent.target.id));
        movieApp.UiDisplay.hideMainScreenAndShowMovieInfoScreen();
    });
}

function addEventListenToCloseButtonAndIcon() {
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener("click", () => {
       movieApp.UiDisplay.hideInfoScreenAndShowMainScreen();
    });
    document.getElementById('logoDiv').addEventListener('click', function() {
        window.location.href = 'https://www.themoviedb.org/?language=en-GB';
    });

}

main();

export {addEventListenerToDisplayedMovie};