const API_URL = "https://autosuggest-backend.onrender.com/api/autosuggest";

const searchBox = document.getElementById("searchBox");

const suggestions = document.getElementById("suggestions");

searchBox.addEventListener("input", function () {

    const query = searchBox.value.trim();

    if(query.length === 0){

        suggestions.innerHTML = "";

        suggestions.style.display = "none";

        return;
    }

    fetchSuggestions(query);

});

function fetchSuggestions(query){

    const fullAPI =
        API_URL +
        "?q=" + encodeURIComponent(query) +
        "&weighted=true" +
        "&algorithm=trie" +
        "&limit=8";

    fetch(fullAPI)

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        showSuggestions(data);

    })

    .catch(function(error){

        console.log(error);

    });

}

function showSuggestions(data){

    suggestions.innerHTML = "";

    if(data.count === 0){

        suggestions.innerHTML =
        "<div class='suggestion-item'>No Matching Results Found</div>";

        suggestions.style.display = "block";

        return;
    }

    data.results.forEach(function(item){

        const div = document.createElement("div");

        div.className = "suggestion-item";

        div.innerHTML =
        "<span>" + item.text + "</span>" +
        "<span class='weight'>" + item.weight + "</span>";

        div.addEventListener("click",function(){

            searchBox.value = item.text;

            suggestions.style.display = "none";

        });

        suggestions.appendChild(div);

    });

    suggestions.style.display = "block";

}