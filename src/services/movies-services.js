export default class MovieDbService {
    apiKey = 'd12c9954440cc420d61a1b83a8f8e34a';

    baseUrl = 'https://api.themoviedb.org/3/';

    getDataMovies = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return await res.json();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Could not fetch: ', err.message);
            return err.message;
        }
    };

    searchMovies = async (searchQuery = 'return', pageNumber = 1) => {
        const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&include_adult=false&query=${searchQuery}&page=${pageNumber}`;
        const body = await this.getDataMovies(url);
        return body;
    };

    getRatedMovies = async (guestSessionToken, pageNumber = 2) => {
        const url = `${this.baseUrl}guest_session/${guestSessionToken}/rated/movies?api_key=${this.apiKey}&page=${pageNumber}`;
        const body = await this.getDataMovies(url);
        return body;
    };

    guestSession = async () => {
        const url = `${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`;
        const body = await this.getDataMovies(url);
        return body;
    };

    setMovieRating = async (id, guestSessionToken, rate) => {
        const url = `${this.baseUrl}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionToken}`;
        const body = {
            value: rate,
        };
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(body),
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.error('Could not fetch: ', err.message);
        });
    };

    deleteRateMovie = async (id, guestSessionToken) => {
        const url = `${this.baseUrl}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionToken}`;
        const headers = {
            'Content-Type': 'application/json;charset=utf-8',
        };
        await fetch(url, {
            method: 'DELETE',
            headers,
        });
    };

    getPopularMovies = async (pageNumber = 1) => {
        const url = `${this.baseUrl}movie/popular?api_key=${this.apiKey}&language=en-US&page=${pageNumber}`;
        const body = await this.getDataMovies(url);
        return body;
    };

    getGenresList = async () => {
        const url = `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`;
        const body = await this.getDataMovies(url);
        return body;
    };
}
