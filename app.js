const apiKey = 'b98c6433'; // Your API key
const movieListElement = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');
let movieData = [];

// Function to fetch movies from the API with pagination (for 100 movies)
async function fetchMovies(query = '') {
    let url;
    const totalPages = 10; // 10 pages, each with 10 results = 100 movies
    
    try {
        // If there is a search query, fetch search results from the API
        if (query) {
            url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`;
        } else {
            // Default query to fetch movies when no search term is provided
            url = `http://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie`;
        }

        const allMovies = [];
        
        // Fetch 10 pages of results (10 movies per page)
        for (let page = 1; page <= totalPages; page++) {
            const response = await fetch(`${url}&page=${page}`);
            const data = await response.json();

            if (data.Response === 'True') {
                allMovies.push(...data.Search); // Add the movies from this page to the list
            }
        }
        
        // If we got movies, display them
        if (allMovies.length > 0) {
            movieData = allMovies; // Save the movie data for later use (for click functionality)
            displayMovies(allMovies);
            errorMessage.textContent = ''; // Clear any previous error messages
        } else {
            errorMessage.textContent = 'Inga filmer hittades eller ett fel inträffade!';
            movieListElement.innerHTML = ''; // Clear any previous movie list
        }
    } catch (error) {
        errorMessage.textContent = 'Nätverksfel. Försök igen senare.';
        movieListElement.innerHTML = ''; // Clear previous movie list
    }
}

// Function to display movie cards (with posters)
function displayMovies(movies) {
    movieListElement.innerHTML = ''; // Clear the current list
    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            // Create the movie poster
            const moviePoster = document.createElement('img');
            moviePoster.src = movie.Poster === 'N/A' ? 'default-poster.jpg' : movie.Poster; // Fallback if no poster
            moviePoster.alt = `Poster for ${movie.Title}`;
            moviePoster.addEventListener('click', () => showMovieDetails(movie.imdbID));

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
    } else {
        errorMessage.textContent = 'Ingen film hittades. Försök med ett annat sökord.';
    }
}

// Function to fetch detailed information about the clicked movie
async function showMovieDetails(imdbID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const movie = await response.json();
        if (movie.Response === 'True') {
            // Display detailed movie info in a modal
            showModal(movie);
        } else {
            errorMessage.textContent = 'Kunde inte hämta filmdetaljer!';
        }
    } catch (error) {
        errorMessage.textContent = 'Nätverksfel. Försök igen senare.';
    }
}

// Function to create and show the modal with movie details
function showModal(movie) {
    // Create the modal structure
    const modal = document.createElement('div');
    modal.classList.add('movie-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'default-poster.jpg'}" alt="Poster for ${movie.Title}" class="movie-modal-img">
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <button class="close-modal">Close</button>
        </div>
    `;

    // Add event listener for closing the modal
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    // Append the modal to the body
    document.body.appendChild(modal);
}

// Event listener for search input
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    fetchMovies(query); // Fetch movies based on search input
});

// Fetch default movies when the page loads
window.addEventListener('load', () => {
    fetchMovies(); // This will fetch a default list of 100 movies when the page loads
});
