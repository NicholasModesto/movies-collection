document.addEventListener('DOMContentLoaded', () => {
    const movieTable = document.getElementById('movie-list');

    function displayMovies(movies) {
        movieTable.innerHTML = '';
        movies.forEach(movie => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movie.title}</td>
                <td>${movie.format}</td>
                <td>${movie.notes}</td>
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
        const sheetId = '12ahIyxGW0R32JIzTV99xi_zVkgX4e4uMF9xdLw3b0ZQ';
        const range = 'Sheet1!A2:C1000';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const movies = data.feed.entry.map(entry => ({
                title: entry.gsx$title.$t,
                format: entry.gsx$format.$t,
                notes: entry.gsx$notes.$t
            }));
            const sortedMovies = sortMoviesByTitle(movies);
            displayMovies(sortedMovies);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }

    fetchMovies();
});