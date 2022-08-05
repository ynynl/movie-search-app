import { MovieDetail } from "../utils/MovieInterface"
import React from "react"

interface PropTypes { movie: MovieDetail }
const Detail = ({ movie }: PropTypes) => <div>
    <h1>  {movie.Title}</ h1>
    <img src={movie.Poster} alt="poster" />
    <p>{movie.Plot}</p>
    <p><strong>Year: </strong>{movie.Year}</p>
    <p><strong>Rated: </strong>{movie.Rated}</p>
    <p><strong>Released: </strong>{movie.Released}</p>
    <p><strong>Runtime: </strong>{movie.Runtime}</p>
    <p><strong>Genre: </strong>{movie.Genre}</p>
    <p><strong>Director: </strong>{movie.Director}</p>
    <p><strong>Writer: </strong>{movie.Writer}</p>
    <p><strong>Actors: </strong>{movie.Actors}</p>
    <p><strong>Language: </strong>{movie.Language}</p>
    <p><strong>Country: </strong>{movie.Country}</p>
    <p><strong>Awards: </strong>{movie.Awards}</p>
    <p><strong>Ratings: </strong>
    </p>
    <ul>
        {movie.Ratings.map(rating =>
            <li key={rating.Source}>{rating.Source}: {rating.Value}</li>)}
    </ul>
    <p><strong>Metascore: </strong>{movie.Metascore}</p>
    <p><strong>imdb Rating: </strong>{movie.imdbRating}</p>
    <p><strong>imdb Votes: </strong>{movie.imdbVotes}</p>
    <p><strong>imdb ID: </strong>{movie.imdbID}</p>
    <p><strong>Type: </strong>{movie.Type}</p>
    <p><strong>DVD: </strong>{movie.DVD}</p>
    <p><strong>Box Office: </strong>{movie.BoxOffice}</p>
    <p><strong>Production: </strong>{movie.Production}</p>
    <p><strong>Website: </strong>{movie.Website}</p>
</div>

export default Detail
