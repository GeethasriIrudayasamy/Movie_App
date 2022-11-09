import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    function fetchMovieHandler() {
        fetch("https://swapi.dev/api/films")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const movieList = data.results.map((moviedata) => {
                    return {
                        id: moviedata.episode_id,
                        title: moviedata.title,
                        releaseDate: moviedata.release_date,
                        openingText: moviedata.opening_crawl,
                    };
                });
                setMovies(movieList);
            });
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies} />
            </section>
        </React.Fragment>
    );
}

export default App;
