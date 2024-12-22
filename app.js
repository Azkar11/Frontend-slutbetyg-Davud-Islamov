const apiKey = 'b98c6433'; // Your API key
const movieListElement = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');

// Function to fetch movies from the API
async function fetchMovies(query = '') {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search); // Pass the list of movies to display
            errorMessage.textContent = ''; // Clear any previous error messages
        } else {
            errorMessage.textContent = 'Inga filmer hittades eller ett fel inträffade!';
            movieListElement.innerHTML = ''; // Clear previous movie list
        }
    } catch (error) {
        errorMessage.textContent = 'Nätverksfel. Försök igen senare.';
        movieListElement.innerHTML = ''; // Clear previous movie list
    }
}

// Function to display movie cards (with posters)
function displayMovies(movies) {
    movieListElement.innerHTML = ''; // Clear the current list
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Create the movie poster
        const moviePoster = document.createElement('img');
        moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image';
        moviePoster.alt = `Poster for ${movie.Title}`;

        // Create movie title and year
        const movieTitle = document.createElement('div');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.Title;

        const movieYear = document.createElement('div');
        movieYear.classList.add('movie-year');
        movieYear.textContent = movie.Year;

        // Append elements to movie card
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieYear);

        // Append movie card to movie list
        movieListElement.appendChild(movieCard);
    });
}

// Event listener for search input
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    fetchMovies(query); // Fetch movies based on search input
});

// Fetch default movies when the page loads
fetchMovies();

// Optionally, you can add functionality to display 10 default movies when the page loads
window.addEventListener('load', () => {
    fetchMovies();
});
