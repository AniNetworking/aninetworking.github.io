document.addEventListener("DOMContentLoaded", function() {
    // Get the current URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extract the anime ID from the URL, assuming the URL is like 'search.html?id=1535'
    const animeId = urlParams.get('item');
    
    if (animeId) {
        // Fetch the anime information using the Jikan API with /full added
        fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    const anime = data.data;

                    // Select the .content div (keeping the original class)
                    const contentDiv = document.querySelector('.content');

                    // Check if the content div exists
                    if (contentDiv) {
                        // Create HTML content for the anime information
                        const animeInfoHTML = `
    <div class="anime-thumbnail">
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <h2>${anime.title}</h2> <!-- Move the title here, under the image -->
    </div>
    <div class="anime-details">
        <p><strong>Score:</strong> ${anime.score}/10</p>
        <p><strong>Discription:</strong> ${anime.synopsis}</p>
        <p><strong>Genres:</strong> ${anime.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Status:</strong> ${anime.status}</p>
        <p><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</p>
        <p><strong>Premiered:</strong> ${anime.aired ? anime.aired.string : 'N/A'}</p>
        <p><strong>Duration:</strong> ${anime.duration || 'N/A'}</p>
        <p><strong>Rating:</strong> ${anime.rating || 'N/A'}</p>
        <p><strong>Source:</strong> ${anime.source || 'N/A'}</p>
        <p><strong>Studio:</strong> ${anime.studios.map(studio => studio.name).join(', ') || 'N/A'}</p>
        <p><strong>Other Titles:</strong> ${anime.title_synonyms.join(', ') || 'N/A'}</p>
    </div>
`;


                        // Insert the anime information into the .content div
                        contentDiv.innerHTML = animeInfoHTML;
                    }
                } else {
                    console.error('No data found for anime ID:', animeId);
                }
            })
            .catch(error => {
                console.error('Error fetching anime information:', error);
            });
    } else {
        console.error('No anime ID found in the URL.');
    }
});
