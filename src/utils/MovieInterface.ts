export interface Movie {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export interface MovieDetail extends Movie {
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Ratings: Rating[],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
}

export interface Rating {
    Source: string,
    Value: string
}
