// Step 1: Get the anime name, genre, or top-rated flag from the URL
function getQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeName = urlParams.get('anime');
    const genre = urlParams.get('genre');
    const topRated = urlParams.get('topRated'); // Check for top-rated anime request
    return { animeName, genre, topRated };
}

// Step 2: Fetch anime data by name, genre, or top-rated from the Jikan API
async function fetchAnimeData(queryParam, genrePage = 1) {
    let apiUrl = '';

    // If it's an anime name, search by name
    if (queryParam.animeName) {
        apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(queryParam.animeName)}&limit=15`;
    }

    // If it's a genre, fetch by genre with pagination
    if (queryParam.genre) {
        apiUrl = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent(queryParam.genre)}&limit=15&page=${genrePage}`;
    }

    // If it's top-rated anime, fetch the top-rated list
    if (queryParam.topRated) {
        apiUrl = `https://api.jikan.moe/v4/top/anime?type=tv&limit=25`; // Top 25 rated anime
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); // Log the entire response to inspect its structure

        // Check if the response contains valid data
        if (data.data && data.data.length > 0) {
            return data.data; // Return the list of anime results
        } else {
            throw new Error("No results found.");
        }
    } catch (error) {
        console.error('Error fetching anime data:', error);
        return [];
    }
}

// Step 3: Add all anime images and titles to the content div
function displayAnimeData(animeData, append = false) {
    const contentDiv = document.querySelector('.results');

    // If append is false, clear previous content
    if (!append) {
        contentDiv.innerHTML = '';
    }

    // Check if there are results
    if (animeData.length > 0) {
        animeData.forEach(anime => {
            const animeTitle = anime.title || 'Unknown Title'; // Handle missing title
            const animeDescription = anime.synopsis || 'No description available.'; // Handle missing description
            const animeId = anime.mal_id; // Jikan API provides the anime's MAL ID

            // Create elements for each anime in the desired format
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            const linkElement = document.createElement('a');
            linkElement.href = `anime.html?item=${animeId}`; // Link to info page with anime ID
            linkElement.textContent = 'View Full Overview';

            const secondNameElement = document.createElement('div');
            secondNameElement.classList.add('scndname');
            secondNameElement.textContent = animeTitle;

            const snippetElement = document.createElement('div');
            snippetElement.classList.add('snippet');
            snippetElement.textContent = animeDescription;

            // Append the elements in the desired structure
            resultItem.appendChild(linkElement);
            resultItem.appendChild(secondNameElement);
            resultItem.appendChild(snippetElement);

            contentDiv.appendChild(resultItem); // Append new content to the bottom
        });
    } else {
        console.log('No anime found for this batch.');
    }
}

// Step 4: Load genres periodically
async function loadGenresContinuously(genreId) {
    let genrePage = 1; // Start with the first page

    const intervalId = setInterval(async () => {
        console.log(`Fetching genre page ${genrePage}`);
        const animeData = await fetchAnimeData({ genre: genreId }, genrePage);

        if (animeData.length > 0) {
            displayAnimeData(animeData, true); // Append new content to the bottom
            genrePage++; // Move to the next page for the next fetch
        } else {
            console.log('No more data for this genre.');
            clearInterval(intervalId); // Stop fetching if no more data
        }
    }, 3000); // Fetch every 3 seconds
}

// Main Function to Execute the Search
async function main() {
    const { animeName, genre, topRated } = getQueryParam();

    if (animeName) {
        const animeData = await fetchAnimeData({ animeName });
        displayAnimeData(animeData);
    } else if (genre) {
        loadGenresContinuously(genre);
    } else if (topRated) {
        const animeData = await fetchAnimeData({ topRated: true });
        displayAnimeData(animeData);
    } else {
        console.log('No anime name, genre, or top-rated flag found in the URL.');
    }
}

// Run the main function when the page loads
main();
