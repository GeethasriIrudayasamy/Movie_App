import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchMovieHandler() {
        setIsLoading(true);
        const url = "https://swapi.dev/api/films";
        const response = await fetch(url);
        const data = await response.json();
        const movieList = data.results.map((moviedata) => {
            return {
                id: moviedata.episode_id,
                title: moviedata.title,
                releaseDate: moviedata.release_date,
                openingText: moviedata.opening_crawl,
            };
        });
        setMovies(movieList);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading  && <MoviesList movies={movies} />}
                {isLoading && <p>Loading...</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
