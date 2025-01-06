const apiKey = 'b98c6433'; // Din API-nyckel
const movieListElement = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const errorMessage = document.createElement('div'); // Felmeddelande-element
let movieData = [];

// Funktion för att hämta filmer från API:t
async function fetchMovies(query = '', isDefault = false) {
    let url;
    const totalPages = 10; // Begränsa till max 10 sidor för effektivitet

    // Standardfilmer om ingen sökning görs
    if (isDefault) {
        url = `http://www.omdbapi.com/?apikey=${apiKey}&s=Avengers&type=movie`; // Standardkategori (t.ex. populära filmer)
    } else {
        url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`;
    }

    try {
        const allMovies = [];

        for (let page = 1; page <= totalPages; page++) {
            const response = await fetch(`${url}&page=${page}`);
            const data = await response.json();

            if (data.Response === 'True') {
                allMovies.push(...data.Search);
            } else if (page === 1) {
                errorMessage.textContent = 'Inga filmer hittades.';
                movieListElement.innerHTML = '';
                return;
            }
        }

        if (allMovies.length > 0) {
            movieData = allMovies;
            displayMovies(allMovies);
            errorMessage.textContent = ''; // Rensa eventuella felmeddelanden
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        errorMessage.textContent = 'Nätverksfel. Försök igen senare.';
        movieListElement.innerHTML = '';
    }
}

// Funktion för att visa filmkorten
function displayMovies(movies) {
    movieListElement.innerHTML = ''; // Rensa befintlig lista
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.Poster === 'N/A' ? 'https://via.placeholder.com/150' : movie.Poster;
        moviePoster.alt = `Poster för ${movie.Title}`;
        moviePoster.addEventListener('click', () => showMovieDetails(movie.imdbID));

        const movieTitle = document.createElement('div');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.Title;

        const movieYear = document.createElement('div');
        movieYear.classList.add('movie-year');
        movieYear.textContent = movie.Year;

        movieCard.append(moviePoster, movieTitle, movieYear);
        movieListElement.appendChild(movieCard);
    });
}

// Funktion för att hämta och visa detaljer om en vald film
async function showMovieDetails(imdbID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const movie = await response.json();
        if (movie.Response === 'True') {
            showModal(movie);
        } else {
            errorMessage.textContent = 'Kunde inte hämta filmdetaljer!';
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        errorMessage.textContent = 'Nätverksfel. Försök igen senare.';
    }
}

// Funktion för att visa en modal med detaljerad information om en film
function showModal(movie) {
    const modal = document.createElement('div');
    modal.classList.add('movie-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="Poster för ${movie.Title}" class="movie-modal-img">
            <p><strong>År:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Handling:</strong> ${movie.Plot}</p>
            <button class="close-modal">Stäng</button>
        </div>
    `;

    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
}

// Lägg till debounce för sökfältet
let debounceTimer;
searchInput.addEventListener('input', (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const query = event.target.value.trim();
        if (query) {
            fetchMovies(query); // Hämta filmer baserat på sökningen
        } else {
            fetchMovies('', true); // Visa standardfilmer igen om fältet är tomt
        }
    }, 300); // Vänta 300ms innan API-anropet görs
});

// Visa standardfilmer vid sidladdning
window.addEventListener('load', () => {
    fetchMovies('', true); // Hämta en förinställd lista med populära filmer
});
