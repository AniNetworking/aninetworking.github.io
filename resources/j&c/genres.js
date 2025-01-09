document.addEventListener("DOMContentLoaded", () => {
    // URL for the Jikan API to get anime genres
    const apiUrl = "https://api.jikan.moe/v4/genres/anime";

    // Fetch the data from the Jikan API
    fetch(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Check if the data contains genres
            if (data.data && Array.isArray(data.data)) {
                // Get the div with class "content"
                const genreDiv = document.querySelector('.content');

                // Loop through each genre and create a list item
                data.data.forEach(genre => {
                    const genreItem = document.createElement('div');
                    genreItem.classList.add('genre-item'); // Add the 'genre-item' class for styling

                    // Create an anchor element for each genre
                    const genreLink = document.createElement('a');
                    genreLink.textContent = genre.name; // Set the text of the link to the genre name

                    // Set the href attribute for the link to point to the search page with the genre's MAL ID
                    genreLink.href = `results.html?genre=${encodeURIComponent(genre.mal_id)}`;

                    // Append the link to the genre item
                    genreItem.appendChild(genreLink);

                    // Append the genre item to the genreDiv
                    genreDiv.appendChild(genreItem);
                });
            } else {
                console.error("No genres found or invalid response format");
            }
        })
        .catch(error => {
            console.error("Error fetching data from Jikan API:", error);
        });
});
