import './style.css'
import {MovieApp} from "./Classes/MovieApp";
import {POPULAR_OPTION, translateMovieTitleToBeSearched, TRENDING_OPTION} from "./Util";

const movieApp = new MovieApp('Simple Movie App');

function main() {
    movieApp.UiDisplay.setUiImages();
     addEventListenerToSearchButtons(movieApp);
     addEventListenToCloseButtonAndIcon();
     addEventListenerToSearchButtonOnMovieDisplay();
}

function addEventListenerToSearchButtons(movieApp) {
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
     const searchButtonDisplayMovieScreen = document.getElementById('goBtn');
     searchButtonDisplayMovieScreen.addEventListener("click", () => {
         const movieEnteredByUser = document.getElementById('searchBarHeaderInput').value;
         console.log('Entered value from search bar: ' + movieEnteredByUser);
         movieApp.setMovieToBeSearched(movieEnteredByUser);
         movieApp.setEnteredUrl();
         movieApp.getMovieDataAndUpdateUi()
             .then(r => console.log('Fetching Data after user search complete'));
         movieApp.UiDisplay.hideMainScreenAndShowMovieInfoScreen()
     });
}

function addEventListenerToSearchButtonOnMovieDisplay() {
    const filterButton =  document.getElementById('filterButton');
    console.log(movieApp.getCurrentSetSearchSetting() + 'das');
   filterButton.addEventListener("click", () => {
       console.log('Fi;ter button clicked!')
       switch (movieApp.getCurrentSetSearchSetting()) {
           case TRENDING_OPTION  :   movieApp.getPopularMovies().then(r => console.log("Fetching Popular Movies")); filterButton.innerHTML = POPULAR_OPTION; break;
           case POPULAR_OPTION :  movieApp.getTrendingMovies().then(r => console.log("Fetching Trending Movies")); filterButton.innerHTML = TRENDING_OPTION; break;
       }
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

