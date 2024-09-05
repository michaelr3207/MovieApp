import './style.css'
import {MovieApp} from "./Classes/MovieApp";

function main() {
     const movieApp = new MovieApp('Simple Movie App');
     addEventListenerToSearchButton(movieApp);
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

main();