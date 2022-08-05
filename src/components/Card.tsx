import React from 'react'
import { Movie } from '../utils/MovieInterface'
import './Card.css';

interface PropType {
    movie: Movie;
    selectMovie: (i: number) => void;
    selectedIdx: number;
}
const Card = ({ movie, selectedIdx, selectMovie }: PropType) => {
    return (
        <div className="card">
            <div className="card-col">
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
                <p>{movie.Type}</p>
                <button className="btn btn__primary"
                    onClick={() => selectMovie(selectedIdx)}>
                    detail
                </button>
            </div>
            <div className="card-col">
                <img
                    src={movie.Poster}
                    alt={`poster of ${movie.Title}`}
                    width="100%"
                />
            </div>
        </div >
    )
}

export default Card