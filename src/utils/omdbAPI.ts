import axios from "axios"
import { Movie, MovieDetail } from "./MovieInterface";

const baseUri = `http://www.omdbapi.com`
const apikey = '6c587c25'

interface OMDBSResponse {
    Response: "True" | "False";
}

interface OMDBSearchResponse extends OMDBSResponse {
    Search: Movie[];
}

interface OMDBMovieResponse extends OMDBSResponse, MovieDetail {
}

interface OMDBErrorResponse extends OMDBSResponse {
    Error: string;
}

const search = async (s: string, page: number = 1): Promise<Movie[]> => {
    try {
        const response = await axios.get<OMDBSearchResponse | OMDBErrorResponse>(baseUri, {
            params: {
                apikey,
                s,
                page
            },
        });
        if (response.data.Response === "False") {
            throw new Error((response.data as OMDBErrorResponse).Error)
        }
        return (response.data as OMDBSearchResponse).Search;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error((error.response.data as OMDBErrorResponse).Error)
        }
        throw error
    }
}

const get = async (i: string): Promise<OMDBMovieResponse> => {
    try {
        const response = await axios.get<OMDBMovieResponse | OMDBErrorResponse>(baseUri, {
            params: {
                apikey,
                i
            },
        });
        if (response.data.Response === "False") {
            throw new Error((response.data as OMDBErrorResponse).Error)
        }
        return (response.data as OMDBMovieResponse);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error((error.response.data as OMDBErrorResponse).Error)
        }
        throw error
    }
}

const omdbAPI = {
    search,
    get
}

export default omdbAPI

