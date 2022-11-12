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
            const url =
                "https://movie-app-c72a2-default-rtdb.firebaseio.com/movies.json";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong...retrying");
            }
            const data = await response.json();
            const movieList = [];

            for (const key in data) {
                movieList.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                });
            }
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

    async function addMovieHandler(movie) {
        const response = await fetch(
            "https://movie-app-c72a2-default-rtdb.firebaseio.com/movies.json",
            {
                method: "POST",
                body: JSON.stringify(movie),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        console.log(data);
    }

    const deleteMovieHandler = async (id) => {
        const response = await fetch(
            `https://react-http-d4523-default-rtdb.firebaseio.com/movies/${id}.json`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();
        console.log(data);
    };

    const cancelRetryHandler = () => {
        setRetry(false);
        setError(null);
    };

    let content = <p>Found no movies</p>;

    if (movies.length > 0) {
        content = (
            <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />
        );
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
                <Form onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
