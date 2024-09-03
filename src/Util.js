

function translateMovieTitleToBeSearched(movieTitle) {
    return movieTitle.replace(/ /g, "+");
}

export {translateMovieTitleToBeSearched};