import React, { useEffect, useState, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import Form from "./components/Form";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(false);

    const fetchMovieHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const url = "https://swapi.dev/api/films";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong...retrying");
            }
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
        } catch (error) {
            setError(error.message);
            setRetry(true);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMovieHandler();
    }, [fetchMovieHandler]);

    useEffect(() => {
        if (retry === true) {
            var retryfunc = setInterval(fetchMovieHandler, 5000);
        }
        return () => {
            clearInterval(retryfunc);
        };
    }, [retry, fetchMovieHandler]);

    const cancelRetryHandler = () => {
        setRetry(false);
        setError(null);
    };

    let content = <p>Found no movies</p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies} />;
    }
    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (!isLoading && error) {
        content = (
            <div>
                <p>{error}</p>
                <button onClick={cancelRetryHandler}>Cancel Retrying</button>
            </div>
        );
    }

    return (
        <React.Fragment>
            <section>
                <Form />
            </section>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
