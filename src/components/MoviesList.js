import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
    return (
        <ul key={props.movies.id} className={classes["movies-list"]}>
            {props.movies.map((movie) => (
                <div>
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        releaseDate={movie.releaseDate}
                        openingText={movie.openingText}
                        deleteMovie={props.onDeleteMovie}
                    />
                </div>
            ))}
        </ul>
    );
};

export default MovieList;
