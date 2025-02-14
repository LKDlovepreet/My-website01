document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");

    if (!categoryName) {
        console.error("Category not found in URL!");
        return;
    }

    document.getElementById("category-title").innerText = categoryName;

    try {
        const response = await fetch("articles.json");
        if (!response.ok) throw new Error("Failed to load JSON file!");
        const articles = await response.json();

        const filteredArticles = articles.filter(article => article.category === categoryName);
        const articlesContainer = document.getElementById("articles-list");

        if (filteredArticles.length === 0) {
            articlesContainer.innerHTML = "<p>No articles found in this category.</p>";
        } else {
            filteredArticles.forEach(article => {
                const articleHTML = `
                    <div class="post-preview" onclick="location.href='article.html?id=${article.id}'">
                        <h2>${article.title}</h2>
                        <p>${article.preview}</p>
                        <small>${article.date}</small>
                    </div>
                `;
                articlesContainer.innerHTML += articleHTML;
            });
        }
    } catch (error) {
        console.error("Error loading articles:", error);
    }
});


const urlParams = new URLSearchParams(window.location.search);
const categoryName = decodeURIComponent(urlParams.get("category"));