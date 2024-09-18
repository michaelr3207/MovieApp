

function translateMovieTitleToBeSearched(movieTitle) {
    return movieTitle.replace(/ /g, "+");
}

export {translateMovieTitleToBeSearched};


const TRENDING_OPTION = 'Trending Movies';
const POPULAR_OPTION = 'Popular Movies';

export {TRENDING_OPTION};