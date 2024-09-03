

class UIDisplay {

    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    updateMovieDetailsOnUi(movieTitle) {
        document.getElementById('movieTitleDiv').innerHTML = movieTitle;
    }
}

export {UIDisplay};