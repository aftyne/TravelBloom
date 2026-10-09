const resultsContainer = document.getElementById("resultsContainer");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const keyword = searchInput.value.trim().toLowerCase();

  if (keyword !== "") {
    fetch("./travel_bloom_api.json")
      .then((response) => response.json())
      .then((data) => {
        let filteredData = [];

        switch (keyword) {
          case "beaches":
          case "beach":
            filteredData = data.beaches;
            break;
          case "countries":
          case "country":
            filteredData = data.countries.flatMap((country) => country.cities);
            break;
          case "temples":
          case "temple":
            filteredData = data.temples;
            break;
          default:
            filteredData = [];
        }

        renderResults(filteredData);

        searchInput.value = "";
      });
  }
});

function renderResults(items) {
  if (!items || items.length === 0) {
    resultsContainer.innerHTML = `<p style="color: #fff; text-align: center;">No results found.</p>`;
    resultsContainer.classList.remove("hidden");
    return;
  }

  resultsContainer.innerHTML = items
    .map(
      (item) => `
      <article class="result-card">
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="result-card-body">
          <h3 class="result-card-title">${item.name}</h3>
          <p class="result-card-desc">${item.description}</p>
          <a href="#" class="result-card-btn">Visit</a>
        </div>
      </article>
    `,
    )
    .join("");

  resultsContainer.classList.remove("hidden");
}

// Clear button resets the view
document.getElementById("search-form").addEventListener("reset", () => {
  resultsContainer.innerHTML = "";
  resultsContainer.classList.add("hidden");
});
