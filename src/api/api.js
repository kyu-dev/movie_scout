/************************************************************
 Api pour fetcher un film et ses details depuis une string
 ************************************************************/

export async function fetchMovies (query) {
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
};



/***************************************************************
 Api pour recuperer le trailer youtube d'un film depuis son id
 **************************************************************/


 
export async function getMoviesVideos (movieID){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI'
    }
  
  };
    try{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=fr-FR`, options)
    const data = await response.json();
    const trailer = `https://www.youtube.com/watch?v=${data.results[0].key}` // recupere la premiere vidéo du resultat de recherche 
    return trailer; 
    }
    catch(err){
      throw new Error('ereur lors de la récupération de la video');
    }
  }
  

/************************************************************
 Api pour fetcher les films les plus populaire
 ************************************************************/
  
export async function getPopularMovies (){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI'
    }
  };
  
  try{
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
    const data = await response.json();
    return data.results;
  }
  catch(err){
    throw new Error('erreur lors de la recupération des films populaires')
  }


  
    
}
 