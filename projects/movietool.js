const fetchButton = document.getElementById('fetch-button');
const movieContainer = document.getElementById('movie-container');
const randomButton = document.getElementById('random-button'); // Add this line

const fetchMovie = async () => {
    const movieTitle = document.getElementById('movie-input').value;
    const response = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=1f6e6d49`);
    const data = await response.json();

    if (data.Response === 'True') {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');

        // Add event listener to remove the movie item
        removeButton.addEventListener('click', () => {
            movieContainer.removeChild(movieItem);
        });
        
        // Set the inner HTML of movieItem including the remove button
        movieItem.innerHTML = `
            <div class="title-container">
                <h2>${data.Title}</h2>
            </div>
            <img class="movie-poster" src="${data.Poster}" alt="${data.Title} poster"> <!-- Change id to class -->
        `;

        // Append the remove button to the movie item
        movieItem.appendChild(removeButton);
        
        // Append the movie item to the movie container
        movieContainer.appendChild(movieItem);
    } else {
        alert(data.Error);
    }
};

// Event listener for the button
fetchButton.addEventListener('click', fetchMovie);

// Event listener for the Enter key
document.getElementById('movie-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchMovie();  
    }
});

// Random selection function
const selectRandomMovie = () => {
    const movies = document.querySelectorAll('.movie-item'); // Get all movie items

    if (movies.length === 0) {
        alert('No movies in the list to select from!'); // Alert if no movies are present
        return;
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * movies.length);
    const selectedMovie = movies[randomIndex];

    // Remove glow class from all posters
    const posters = document.querySelectorAll('.movie-poster');
    posters.forEach(poster => {
        poster.classList.remove('glow'); // Remove glow class
    });

    // Add glow class to selected poster
    const selectedPoster = selectedMovie.querySelector('.movie-poster');
    selectedPoster.classList.add('glow'); // Add glowing effect
};

// Event listener for the random button
randomButton.addEventListener('click', selectRandomMovie);
