const API_KEY = "1f69724f63df53d6531864023b305a99";
const API_URL = "/api/news?query=";

window.addEventListener("load", () => fetchNews("India"));
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${API_URL}${query}&lang=en&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById("cards-container");
    const newsCard = document.getElementById("news-template"); // ✅ use id
    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.image) return;
        const cardClone = newsCard.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}


function fillDataInCard(card, article) {
    const newsImg = card.querySelector("#news-image");
    const newsTitle = card.querySelector("#news-title");
    const newsSrc = card.querySelector("#news-src");
    const newsDesc = card.querySelector("#news-desc");
    const cardContent = card.querySelector(".card-content");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsSrc.innerHTML = `${article.source.name} - ${new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}`;
    newsDesc.innerHTML = article.description;
    const readMore = document.createElement("a");
    readMore.textContent = "Read more →";
    readMore.href = article.url;
    readMore.target = "_blank";
    readMore.classList.add("read-more");
    cardContent.appendChild(readMore);
    card.firstElementChild._article = article;

    card.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
        
    });
}
function attachCardClickListeners() {
    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {
        card.addEventListener("click", () => {
            const article = card._article;
            if (article) {
                window.open(article.url, "_blank");
            }
        });
    });
}
   
let currentActiveNav = null;
const navQueryMap = {
    Home: "India",
    World: "world news",
    Politics: "politics",
    Business: "business",
    Technology: "technology",
    Science: "science",
    Health: "health",
    Sports: "sports",
    Entertainment: "entertainment"
};

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (!query) return;
    fetchNews(query);
    currentActiveNav?.classList.remove("active");
    currentActiveNav = null;
})
searchText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchButton.click();
});
const menuButton = document.getElementById("menu-button");
const dropdown = document.getElementById("dropdown");
const mobileNav = document.getElementById("mobile-nav");

menuButton.addEventListener("click", (e) => {
    e.stopPropagation();

    if (window.innerWidth <= 1024) {
        mobileNav.classList.toggle("open");
        dropdown.style.display = "none"; // keep dropdown closed on mobile
    } else {
        dropdown.style.display =
            dropdown.style.display === "flex" ? "none" : "flex";
        mobileNav.classList.remove("open");
    }
});

// Close both menus when clicking outside
document.addEventListener("click", (e) => {
    if (!menuButton.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
        mobileNav.classList.remove("open");
    }
});
function onNavItemClick(id) {
    const query = navQueryMap[id] || id;
    fetchNews(query);
    const navItem = document.getElementById(id);
    currentActiveNav?.classList.remove("active");
    navItem.classList.add("active");
    currentActiveNav = navItem;
    mobileNav.classList.remove("open");
    dropdown.style.display = "none"; // also close dropdown
}
