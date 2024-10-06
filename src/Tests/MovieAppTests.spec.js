import { MovieApp } from '../Classes/MovieApp';
import { beforeEach, describe, it, expect } from '@jest/globals';
import {Movie} from "../Classes/Movie";

// Mock the global fetch function
global.fetch = jest.fn();

describe('MovieApp', () => {
    let movieApp;
    let mockUIDisplay;

    beforeEach(() => {
        // Reset the mock fetch before each test
        fetch.mockReset();

        document.body.innerHTML = `
        <div id="container2TitleDiv"></div>
        <div id="displayedMoviesDiv"></div>  <!-- Mock the missing element -->
    `;

        // Mock the UIDisplay class
        mockUIDisplay = {
            setDisplayedMoviesHeaderTitle: jest.fn(),
            buildDisplayedMovieComponent: jest.fn().mockReturnValue(document.createElement('div')),
            updateMovieDetailsOnUi: jest.fn(),
            unlockScrollBar: jest.fn(),
            addMovieComponent: jest.fn()
        };

        // Create a new MovieApp instance with mock UIDisplay
        movieApp = new MovieApp('Test Movie App');
        movieApp.UiDisplay = mockUIDisplay;
    });

    it('should set and get the current search setting', () => {
        movieApp.setCurrentSetSearchSetting('Trending');
        expect(movieApp.getCurrentSetSearchSetting()).toBe('Trending');
    });

    it('should set and get the number of displayed movies', () => {
        movieApp.setNumberOfDisplayedMovies(5);
        expect(movieApp.getNumberOfDisplayedMovies()).toBe(5);
    });

    it('should fetch and update trending movies in the UI', async () => {
        const mockTrendingMoviesResponse = {
            results: [
                { original_title: 'Movie 1', poster_path: '/path1.jpg' },
                { original_title: 'Movie 2', poster_path: '/path2.jpg' },
            ],
        };

        // Mock the fetch response for trending movies
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockTrendingMoviesResponse),
        });

        await movieApp.getTrendingMovies();

        expect(movieApp.getNumberOfDisplayedMovies()).toBe(2);
        expect(mockUIDisplay.setDisplayedMoviesHeaderTitle).toHaveBeenCalledWith('Trending Movies');
        expect(mockUIDisplay.addMovieComponent).toHaveBeenCalledTimes(2);
        expect(mockUIDisplay.unlockScrollBar).not.toHaveBeenCalled();
    });

    it('should fetch and update popular movies in the UI', async () => {
        const mockPopularMoviesResponse = {
            results: [
                { original_title: 'Popular Movie 1', poster_path: '/popular1.jpg' },
                { original_title: 'Popular Movie 2', poster_path: '/popular2.jpg' },
            ],
        };

        // Mock the fetch response for popular movies
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockPopularMoviesResponse),
        });

        await movieApp.getPopularMovies();

        expect(movieApp.getNumberOfDisplayedMovies()).toBe(2);
        expect(mockUIDisplay.setDisplayedMoviesHeaderTitle).toHaveBeenCalledWith('Popular Movies');
        expect(mockUIDisplay.addMovieComponent).toHaveBeenCalledTimes(2);
    });

    it('should fetch movie data and update the UI', async () => {
        const mockMovieData = {
            Actors: "Mads Mikkelsen, Nikolaj Lie Kaas",
            Awards: "9 wins & 34 nominations",
            BoxOffice: "$77,115",
            Country: "Denmark, Sweden, Finland",
            DVD: "N/A",
            Director: "Anders Thomas Jensen",
            Genre: "Action, Comedy, Drama",
            Language: "Danish, Arabic, Estonian",
            Metascore: "81",
            Plot: "Markus goes home to his teenage daughter, Mathilde, when his wife dies in a train crash. All appears to be a tragic accident until a mathematics geek, who was also a fellow passenger on the train, and his two colleagues show up.",
            Poster: "https://m.media-amazon.com/images/M/MV5BZWVkNTFmNTQtMGRiZC00NjAwLThjYTgtYmI3ZjA2Zjc1MTM1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
            Production: "N/A",
            Rated: "Not Rated",
            Ratings: [
                { Source: "Internet Movie Database", Value: "7.5/10" },
                { Source: "Rotten Tomatoes", Value: "88%" },
                { Source: "Metacritic", Value: "81/100" }
            ],
            Released: "21 May 2021",
            Response: "True",
            Runtime: "116 min",
            Title: "Riders of Justice",
            Type: "movie",
            Website: "N/A",
            Writer: "Anders Thomas Jensen, Nikolaj Arcel",
            Year: "2020",
            imdbID: "tt11655202",
            imdbRating: "7.5",
            imdbVotes: "65,084"
        };

        // Mock the fetch response for movie data
        fetch.mockResolvedValueOnce({
            ok: true, // Indicating a successful response
            status: 200, // Mock HTTP status code
            json: jest.fn().mockResolvedValueOnce(mockMovieData),
        });

        // Mock the fetch response for movie data
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockMovieData),
        });

        await movieApp.getMovieDataAndUpdateUi();

        const selectedMovie = movieApp.getCurrentSelectedMovie();
        expect(selectedMovie.name).toBe('Riders of Justice');
        expect(selectedMovie.rating).toBe('7.5');
        expect(selectedMovie.cast).toBe('Mads Mikkelsen, Nikolaj Lie Kaas');
        expect(mockUIDisplay.updateMovieDetailsOnUi).toHaveBeenCalledWith(selectedMovie);
    });

    it('should set and get the movie to be searched', () => {
        movieApp.setMovieToBeSearched('Inception');
        expect(movieApp.getMovieToBeSearched()).toBe('Inception');
    });

    it('should set the entered URL for movie search', () => {
        // Assuming translateMovieTitleToBeSearched is mocked or handled
        movieApp.setEnteredUrl();
        expect(movieApp.enteredUrl).toBe(movieApp.getApiLink() + 'Riders+of+Justice');
    });
});
