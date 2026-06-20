const searchBox = document.getElementById("searchBox");
const suggestions = document.getElementById("suggestions");

searchBox.addEventListener("input", async () => {

    const query = searchBox.value.trim();

    if (!query) {
        suggestions.innerHTML = "";
        return;
    }

    try {

        const response = await fetch(
            `https://autosuggest-backend.onrender.com/api/autosuggest?q=${query}&weighted=true&algorithm=trie&limit=8`
        );

        const data = await response.json();

        suggestions.innerHTML = "";

        data.results.forEach(item => {

            const div = document.createElement("div");

            div.className = "suggestion-item";

            div.innerHTML = `
                <span>${item.text}</span>
                <span class="weight">${item.weight}</span>
            `;

            div.addEventListener("click", () => {
                searchBox.value = item.text;
                suggestions.innerHTML = "";
            });

            suggestions.appendChild(div);
        });

    } catch (error) {
        console.error(error);
    }
});