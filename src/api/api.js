export const fetchMovies = async (query) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI'
      }
    };
  
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
      const data = await response.json();
      return data.results;
    } catch (err) {
      throw new Error('Erreur lors de la récupération des films');
    }
  };
