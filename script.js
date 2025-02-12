document.addEventListener("DOMContentLoaded", function () {
    // ✅ Sidebar Toggle 
    const menuIcon = document.querySelector(".menu-icon");
    const sidebar = document.querySelector(".sidebar");

    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });

    // ✅ Search Bar Expand
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

    searchContainer.addEventListener("click", function () {
        searchContainer.classList.add("active");
        searchInput.focus();
    });

    document.addEventListener("click", function (event) {
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove("active");
        }
    });

    // ✅ Load Articles
    fetch("articles.json")
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
            console.error("❌ JSON is empty or not an array!");
            return;
        }

        console.log("✅ Loaded Articles:", data);

        // ✅ Sort articles (newest first)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        console.log("✅ Sorted Articles:", data);

        let postsContainer = document.getElementById("posts");
        let perPage = 10;  // ✅ Only 10 articles per page
        let currentPage = 1;
        let totalPages = Math.ceil(data.length / perPage);

        function renderArticles(page) {
            postsContainer.innerHTML = ""; // ✅ Clear old content
            let start = (page - 1) * perPage;
            let end = start + perPage;
            let articlesToShow = data.slice(start, end);

            if (articlesToShow.length === 0) {
                postsContainer.innerHTML = "<p>No articles available.</p>";
                return;
            }

            articlesToShow.forEach(post => {
                let postElement = document.createElement("div");
                postElement.classList.add("post-preview");
                postElement.innerHTML = `
                    <div class="post-button" onclick="window.location.href='${post.url}'">
                        <h2>${post.title}</h2>
                        <p><strong>Category:</strong> ${post.category} | <strong>Date:</strong> ${post.date}</p>
                        <p>${post.preview}</p>
                        <span class="read-more">Read More</span>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });

            renderPagination();
        }

        function renderPagination() {
            let paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = ""; // ✅ Clear old pagination

            for (let i = 1; i <= totalPages; i++) {
                let pageBtn = document.createElement("button");
                pageBtn.textContent = i;
                pageBtn.classList.add("page-btn");
                if (i === currentPage) pageBtn.classList.add("active");

                pageBtn.addEventListener("click", function () {
                    currentPage = i;
                    renderArticles(currentPage);
                });

                paginationContainer.appendChild(pageBtn);
            }
        }

        renderArticles(currentPage);
    })
    .catch(error => console.error("❌ Error loading JSON:", error));
});