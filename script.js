document.addEventListener('DOMContentLoaded', () => {
    const movieTable = document.getElementById('movie-list');

    function displayMovies(movies) {
        movieTable.innerHTML = '';
        movies.forEach(movie => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movie.title}</td>
                <td>${movie.format}</td>
            `;
            movieTable.appendChild(row);
        });
    }

    function sortMoviesByTitle(movies) {
        return movies.sort((a, b) => {
            const titleA = a.title.replace(/^The\s+/i, '');
            const titleB = b.title.replace(/^The\s+/i, '');
            return titleA.localeCompare(titleB);
        });
    }

    async function fetchMovies() {
        const apiKey = 'AIzaSyD0NTvju2gQOz-RlnmQdoR00cSvP-iRnw4';

// TODO update sheetID
// TODO consolidate music stuff

        const sheetId = '12ahIyxGW0R32JIzTV99xi_zVkgX4e4uMF9xdLw3b0ZQ';
        const range = 'Sheet1!A2:C1000';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        try {
            const response = await fetch(url);
                //console.log("dev: fetch success")
            const data = await response.json();
                //console.log ("dev: " + JSON.stringify(data));
            
            const moviesCollection = { movies: [] };
            
            data.values.forEach(entry => {
                // Create a new movie object with appropriate fields
                const movie = {
                    title: entry[0] || "",         // Title is the first item
                    format: entry[1] || "",        // Format is the second item
                    notes: entry[2] || ""          // Notes is the third item (if available)
                };
                // Push the movie object into the transformedData array
                moviesCollection.movies.push(movie);
            });

            const sortedMovies = sortMoviesByTitle(moviesCollection.movies);
            displayMovies(sortedMovies);

        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }

    fetchMovies();
});