import './style.css'
import {MovieApp} from "./Classes/MovieApp";
import {translateMovieTitleToBeSearched} from "./Util";

const movieApp = new MovieApp('Simple Movie App');

function main() {
     addEventListenerToSearchButton(movieApp);
     addEventListenToCloseButton();
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
    displayedMovie.addEventListener("click", (mouseEvent) => {
        console.log(`ehfnhehefhef: ${displayedMovie.id}`)
        movieApp.setMovieToBeSearched(displayedMovie.id);
        movieApp.setEnteredUrl();
        movieApp.getMovieDataAndUpdateUi().then(r => console.log('Fetching complete! You clicked: ' + mouseEvent.target.id));
        movieApp.UiDisplay.hideMainScreenAndShowMovieInfoScreen();
    });
}

function addEventListenToCloseButton() {
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener("click", () => {
       movieApp.UiDisplay.hideInfoScreenAndShowMainScreen();
    });
}

main();

export {addEventListenerToDisplayedMovie};