/************************************************************
 Api pour fetcher un film et ses details depuis une string
 ************************************************************/

export async function fetchMovies(query) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI",
    },
  };

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
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI",
    },
  };
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

export async function getPopularMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1",
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error("erreur lors de la recupération des films populaires");
  }
}

/************************************************************
 Api pour fetcher les films les mieux notés
 ************************************************************/

export async function getMostRatedMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error("erreur lors de la récupération des films les mieux noté");
  }
}

/************************************************************
 Api pour recuperer les détails d'un film
 ************************************************************/

export async function getMovieDetails(movieID) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI",
    },
  };

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

export async function getRecomandation(movieID) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI",
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/recommendations?language=en-US&page=1`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error("erreur lors de la recupération des recomandations");
  }
}
