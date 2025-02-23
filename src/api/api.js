const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

/************************************************************
 Api pour fetcher un film et ses details depuis une string
 ************************************************************/

export async function fetchMovies(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fr-FR&page=1`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error("Erreur lors de la récupération des films");
  }
}

/***************************************************************
 Api pour recuperer le trailer youtube d'un film depuis son id
 **************************************************************/

export async function getMoviesVideos(movieID) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?language=fr-FR`,
      options
    );
    const data = await response.json();
    const trailer = `https://www.youtube.com/watch?v=${data.results[0].key}`; // recupere la premiere vidéo du resultat de recherche
    return trailer;
  } catch (err) {
    throw new Error("ereur lors de la récupération de la video");
  }
}

/************************************************************
 Api pour fetcher les films les plus populaire
 ************************************************************/

export async function getPopularMovies(page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=${page}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("erreur lors de la recupération des films populaires");
  }
}

/************************************************************
 Api pour fetcher les films les mieux notés
 ************************************************************/

export async function getMostRatedMovies(page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("erreur lors de la récupération des films les mieux noté");
  }
}

/************************************************************
 Api pour recuperer les détails d'un film
 ************************************************************/

export async function getMovieDetails(movieID) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?language=fr-FR`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Erreur lors de la récupération des détails du film");
  }
}

/************************************************************
 Api qui récupère les recomandation en fonction d'un film
 ************************************************************/

export async function getRecomandation(movieID, page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/recommendations?language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("erreur lors de la recupération des recomandations");
  }
}

/************************************************************
 Api qui récupère les genres des films en fr 
 ************************************************************/

export async function getGenre() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=fr",
      options
    );
    const data = await response.json();
    return data.genres;
  } catch (err) {
    throw new Error("erreur lors de la recuperation des genre");
  }
}

/************************************************************
 Api qui récupère les films par id donc aussi par genre
 ************************************************************/

export async function getMoviesByGenre(genreId, page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=fr-FR&page=${page}`,
      options
    );
    return await response.json();
  } catch (err) {
    throw new Error("Erreur lors de la récupération des films par genre");
  }
}
