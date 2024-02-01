const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e0f9e97f7d0f3f1e12ccc286f0613614&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e0f9e97f7d0f3f1e12ccc286f0613614&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Fetch initial list of movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    // Clearing the main, because we don't want searched items
    // to be added to the list but replace current items
    main.innerHTML = ''

    // Take the fetched data, loop through it to extract needed info
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        // Create movie element to put it into DOM (same structure previously
        // hardcoded in the HTML file)
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        // The structure described above, with fields being replaced from
        // hardcoded ones to populated by information from API
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}"
            alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="review">
            <h3>Plot</h3>
            ${overview}
        </div>
        `

        main.appendChild(movieEl)
    })
}

// Color movie ratings, the better the greener  : )
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >=5) {
        return 'orange'
    } else {
        return 'red'
    }
}

// Add search functionality
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})