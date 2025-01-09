// Function to get anime suggestions
async function getAnimeSuggestions() {
    const searchInput = document.getElementById('anime-search').value;
    const suggestionsList = document.getElementById('suggestions-list');

    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    if (!searchInput) {
        suggestionsList.style.display = 'none';
        return;
    }

    try {
        // Fetch suggestions from Jikan API
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchInput}&limit=3`);
        const data = await response.json();

        // Only show suggestions if there are results
        if (data.data && data.data.length > 0) {
            suggestionsList.style.display = 'block';
            data.data.forEach(anime => {
                const listItem = document.createElement('li');
                listItem.textContent = anime.title;
                listItem.onclick = () => {
                    // When an item is clicked, populate the search bar with the title
                    document.getElementById('anime-search').value = anime.title;
                    suggestionsList.style.display = 'none';
                    // Perform the search for the clicked suggestion
                    searchAnime(anime.title);
                };
                suggestionsList.appendChild(listItem);
            });
        } else {
            suggestionsList.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching anime suggestions:', error);
        suggestionsList.style.display = 'none';
    }
}

// Function to handle the click event of the search button
function searchAnime(searchQuery) {
    // Use the value from the search input or the clicked suggestion title
    const searchInput = searchQuery || document.getElementById('anime-search').value;
    if (searchInput) {
        window.location.href = `results.html?anime=${encodeURIComponent(searchInput)}`;
    }
}

// Function to check if the Enter key was pressed
function checkEnterKey(event) {
    if (event.key === 'Enter') {
        searchAnime(); // Trigger search if Enter key is pressed
    }
}
