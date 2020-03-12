export class Search {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export class OmdbResponse {
    Search: Search[];
}

export class TitleInfo {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    totalSeasons: string;
    Response: string;
}

export class SeasonInfo {
    Title: string;
    Season: string;
    totalSeasons: string;
    Episodes: {
        Title: string;
        Released: string;
        Episode: string;
        imdbRating: string;
        imdbID: string;
    }[];
    Response: string;
}
