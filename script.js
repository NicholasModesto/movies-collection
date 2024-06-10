document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');
    const movieForm = document.getElementById('movie-form');
    
    // function fetchMovies() {
    //     fetch('movies.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             movieList.innerHTML = '';
    //             data.movies.forEach(movie => {
    //                 const movieDiv = document.createElement('div');
    //                 movieDiv.className = 'movie';
    //                 movieDiv.innerHTML = `
    //                     <h2>${movie.title}</h2>
    //                     <p>${movie.format}</p>
    //                     <p>${movie.notes}</p>
    //                 `;
    //                 movieList.appendChild(movieDiv);
    //             });
    //         });
    // }

    function fetchMovies() {
        fetch('movies.json')
            .then(response => response.json())
            .then(data => {
                movieList = sortMoviesByTitle(data);
                displayMovies(movieList);
                });
            });
    }

    
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


    
    function addMovie(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const format = document.getElementById('format').value;
        const notes = document.getElementById('notes').value;

        fetch('movies.json')
            .then(response => response.json())
            .then(data => {
                const newMovie = { title, format, notes };
                data.movies.push(newMovie);
                
                updateMoviesJson(data.movies);
            });
    }

    function updateMoviesJson(movies) {
        const githubUsername = 'your-username';
        const repoName = 'movie-collection';
        const branch = 'main';
        const token = 'your-personal-access-token';

        fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/movies.json`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const sha = data.sha;
            const content = btoa(JSON.stringify({ movies }));

            const updateContent = {
                message: 'Update movies.json',
                content: content,
                sha: sha,
                branch: branch
            };

            return fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/contents/movies.json`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateContent)
            });
        })
        .then(response => {
            if (response.ok) {
                fetchMovies();
            } else {
                alert('Failed to update movies.json');
            }
        });
    }

    movieForm.addEventListener('submit', addMovie);
    fetchMovies();
});
