document.addEventListener('DOMContentLoaded', () => {
    const movieTable = document.getElementById('movie-list');

    function displayMovies(movies) {
        movieTable.innerHTML = '';
        movies.forEach(movie => {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            titleCell.textContent = movie.title;

            const formatCell = document.createElement('td');
            formatCell.textContent = movie.format;

            row.appendChild(titleCell);
            row.appendChild(formatCell);
            movieTable.appendChild(row);
        });
    }

    function sortMoviesByTitle(movies) {
        return [...movies].sort((a, b) => {
            const titleA = a.title.replace(/^The\\s+/i, '');
            const titleB = b.title.replace(/^The\\s+/i, '');
            return titleA.localeCompare(titleB);
        });
    }

    async function fetchMovies() {
        const apiKey = 'AIzaSyD0NTvju2gQOz-RlnmQdoR00cSvP-iRnw4';
        const sheetId = '12ahIyxGW0R32JIzTV99xi_zVkgX4e4uMF9xdLw3b0ZQ';
        const range = 'Sheet1!A2:C1000';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            if (!data || !Array.isArray(data.values)) {
                console.warn('No data received from the sheet.');
                displayMovies([]);
                return;
            }

            const moviesCollection = { movies: [] };

            data.values.forEach(entry => {
                const movie = {
                    title: entry[0] || "",
                    format: entry[1] || "",
                    notes: entry[2] || ""
                };
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
