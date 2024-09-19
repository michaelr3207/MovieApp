

function translateMovieTitleToBeSearched(movieTitle) {
    return movieTitle.replace(/ /g, "+");
}

export {translateMovieTitleToBeSearched};


const TRENDING_OPTION = 'Trending Movies';
const POPULAR_OPTION = 'Popular Movies';
const MAX_PAGE_VALUE = 12;

export {TRENDING_OPTION, POPULAR_OPTION, MAX_PAGE_VALUE};