const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGNjOGQ0YTE1NDgwYWM4MGM3ZGY2NWQ2ZmY0YTVlYSIsInN1YiI6IjVmNTY4ODJlZmQ0YTk2MDAzNzI3MGEyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HI2tJK5oWAbEIbKo7I27nzjXty-U_caLZ9zL3pL7ZnY",
  },
};

function tmdbFetch(route) {
  return fetch(route, options).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Movies not found`));
  });
}

const tmdbAPI = {
  getTrendingMovies: () =>
    tmdbFetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=uk-UA"
    ),
  getPopularStars: () =>
    tmdbFetch("https://api.themoviedb.org/3/person/popular?language=uk-UA"),
  getMovieById: (id) =>
    tmdbFetch(`https://api.themoviedb.org/3/movie/${id}?language=uk-UA`),
  getMoviesByQuery: (query, page) =>
    tmdbFetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=uk-UA&page=${page}`
    ),
  getPersonById: (id) =>
    tmdbFetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`),
  getTrailersForMovieById: (id) =>
    tmdbFetch(`https://api.themoviedb.org/3/movie/${id}/videos`),
};

export default tmdbAPI;
