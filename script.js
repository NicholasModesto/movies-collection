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
        try {
            // const response = await fetch('https://spreadsheets.google.com/feeds/list/1dlPnmIyduK_qcAziuLkWEfEoTCUAu3aK/od6/public/values?alt=json');
            const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1dlPnmIyduK_qcAziuLkWEfEoTCUAu3aK/values/');
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


