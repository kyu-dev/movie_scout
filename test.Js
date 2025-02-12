const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDBiMWFkZmNmODQ2MjUwY2UwODc4NzM4YWYwNjJlZSIsIm5iZiI6MTczNTQ4OTI5OC45MzYsInN1YiI6IjY3NzE3NzEyN2QxYmM4N2RlNzYxNzNlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-vhRujkWEsk9VRXBZwgcLXUPsARMCNUHYZabsl65fgI'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=US', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));