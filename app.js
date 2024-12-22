const apiUrl = "http://www.omdbapi.com/?apikey=b98c6433";
let debounceTimer; // Variable to hold the debounce timeout

// Attach input event listener to search field
document.getElementById("search-input").addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length > 0) {
    // Clear the previous debounce timer to avoid too many API calls
    clearTimeout(debounceTimer);

    // Set a new debounce timer
    debounceTimer = setTimeout(async () => {
      const movies = await fetchMovies(query);
      renderMovies(movies);
    }, 300); // 300ms delay before making the API call
  } else {
    // If the input field is empty, clear the movie list
    document.getElementById("movie-list").innerHTML = "";
  }
});

// Fetch movies from OMDb API
async function fetchMovies(query) {
  try {
    const response = await fetch(`${apiUrl}&s=${query}`);
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data", error);
    alert("Error fetching movie data.");
    return [];
  }
}

// Render movies in the movie list
function renderMovies(movies) {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = ""; // Clear previous results

  if (movies.length === 0) {
    movieList.innerHTML = "<p>No movies found. Try a different search.</p>";
  }

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <button class="favorite-btn" data-imdbid="${movie.imdbID}">Add to Favorites</button>
    `;

    // Favorite button functionality
    movieCard.querySelector(".favorite-btn").addEventListener("click", () => {
      addToFavorites(movie);
    });

    movieList.appendChild(movieCard);
  });
}

// Add movie to localStorage as a favorite
function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Movie added to favorites!");
  } else {
    alert("Movie is already in favorites.");
  }
}

// Render favorite movies on the favorites page
window.addEventListener("load", () => {
  if (window.location.pathname.includes("favorites.html")) {
    renderFavorites();
  }
});

// Fetch and display favorite movies
function renderFavorites() {
  const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoriteMoviesSection = document.getElementById("favorite-movies");

  if (favoriteMovies.length === 0) {
    favoriteMoviesSection.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favoriteMovies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;

    favoriteMoviesSection.appendChild(movieCard);
  });
}
