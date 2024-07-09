const access_key = "JEIOhp_q0QTbKN6B_thRqlNtt2ear5wR-y9XiBOMieI";

const searchForm = document.getElementById("Search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value.trim();
    if (!keyword) {
        alert("Please enter a search term");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access_key}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch images");
        }
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        });

        searchMoreBtn.style.display = results.length ? "block" : "none";

    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching images. Please try again.");
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

searchMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
