const modal = document.getElementById("modal");
const grid = document.getElementById("grid");

const gameTitle = document.getElementById("gameTitle");
const username = document.getElementById("username");
const password = document.getElementById("password");

const searchInput = document.getElementById("search");
const toast = document.getElementById("toast");

const guardBox = document.getElementById("guardBox");
const guardText = document.getElementById("guardText");
const guardLink = document.getElementById("guardLink");

let allGames = [];

async function loadGames() {
    try {
        const response = await fetch("./data/games.json");

        if (!response.ok) {
            throw new Error("โหลด games.json ไม่สำเร็จ");
        }

        allGames = await response.json();
        renderGames(allGames);

    } catch (error) {
        console.error(error);
        grid.innerHTML = "<p>ไม่สามารถโหลดข้อมูลเกมได้</p>";
    }
}

function renderGames(games) {
    grid.innerHTML = "";

    games.forEach(game => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML =
            '<img src="' + game.image + '" alt="' + game.title + '">' +
            '<div class="card-title">' +
            game.title +
            '</div>';

        card.addEventListener("click", () => {
            openGame(
                game.title,
                game.username,
                game.password,
                game.steamGuard,
                game.guardText,
                game.guardLink
            );
        });

        grid.appendChild(card);
    });
}

function openGame(title, user, pass, steamGuard, guardTextValue, guardLinkValue) {
    gameTitle.textContent = title;

    username.value = user;
    password.value = pass;
    password.type = "password";

    if (steamGuard === true) {
        guardBox.classList.add("active");
        guardText.textContent = guardTextValue || "เกมนี้มี Steam Guard";
        guardLink.href = guardLinkValue || "#";
    } else {
        guardBox.classList.remove("active");
        guardText.textContent = "";
        guardLink.href = "#";
    }

    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

function copyText(id) {
    const value = document.getElementById(id).value;

    navigator.clipboard.writeText(value);
    showToast();
}

function togglePass() {
    password.type =
        password.type === "password"
            ? "text"
            : "password";
}

function showToast() {
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 1500);
}

function searchGame() {
    const keyword = searchInput.value.toLowerCase();

    const filteredGames = allGames.filter(game =>
        game.title.toLowerCase().includes(keyword)
    );

    renderGames(filteredGames);
}

searchInput.addEventListener("input", searchGame);

window.addEventListener("click", e => {
    if (e.target === modal) {
        closeModal();
    }
});

loadGames();