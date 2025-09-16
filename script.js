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

    function showError(message) {
        movieTable.innerHTML = '';
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2;
        cell.textContent = message;
        row.appendChild(cell);
        movieTable.appendChild(row);
    }

    async function fetchMovies() {
        const sheetId = '12ahIyxGW0R32JIzTV99xi_zVkgX4e4uMF9xdLw3b0ZQ';
        const sheetName = 'Sheet1';
        const range = 'A2:C1000';
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&range=${encodeURIComponent(range)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }

            const text = await response.text();
            const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s);
            if (!match) {
                throw new Error('Unexpected response format from Google Sheets.');
            }

            const payload = JSON.parse(match[1]);
            const rows = payload?.table?.rows;
            if (!Array.isArray(rows)) {
                console.warn('No data received from the sheet.');
                displayMovies([]);
                return;
            }

            const moviesCollection = rows.map(entry => ({
                title: entry.c?.[0]?.v || "",
                format: entry.c?.[1]?.v || "",
                notes: entry.c?.[2]?.v || ""
            }));

            const sortedMovies = sortMoviesByTitle(moviesCollection);
            displayMovies(sortedMovies);

        } catch (error) {
            console.error('Error fetching movie data:', error);
            showError('Sorry, we could not load the movie list. Please refresh to try again.');
        }
    }

    fetchMovies();
});
