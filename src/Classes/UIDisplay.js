import Star from '../Images/3cb5d19f756bc95af4354a32797c7149.jpg'

class UIDisplay {

    constructor(name) {
        this.name = name;
        this.setStarImage();
    }

    setStarImage() {
        const starImage = new Image();
        starImage.src = Star;
        document.getElementById('starImage').innerHTML = ''
        document.getElementById('starImage').append(starImage);
    }

    updateMovieDetailsOnUi(currentMovie) {
        document.getElementById('movieTitleDiv').innerHTML = currentMovie.getMovieName();
        document.getElementById('rating').innerHTML = currentMovie.getMovieRating();
        document.getElementById('castDescription').innerHTML = currentMovie.getMovieCast();
        document.getElementById('plotDescription').innerHTML = currentMovie.getMoviePlot();
        document.getElementById('imageContainer').innerHTML = '';
        document.getElementById('imageContainer').append(currentMovie.getMoviePoster());
    }

}

export {UIDisplay};