const USER = {
    login: String,
    name: String,
    bio: String,
    avatar_url: String, // Fix the typo here
    public_repos: Number,
    followers: Number,
    following: Number,
    repos: Array,
}

const QUERY = document.querySelector('.query');

async function getUser() {
    await getRepos(); // Wait for getRepos to complete
    const URL = `https://api.github.com/users/${QUERY.value}`;
    const DATA = await fetch(URL);
    const USER_DATA = await DATA.json();

    if (USER_DATA.message === 'Not Found') {
        alert("User Not Found")
        return;
    }

    USER.login = USER_DATA.login;
    USER.name = USER_DATA.name;
    USER.bio = USER_DATA.bio;
    USER.avatar_url = USER_DATA.avatar_url; // Fix the property name
    USER.public_repos = USER_DATA.public_repos;
    USER.followers = USER_DATA.followers;
    USER.following = USER_DATA.following;

    getAllData();
}

async function getRepos() {
    const URL = `https://api.github.com/users/${QUERY.value}/repos`;
    const DATA = await fetch(URL)
    const REPOS = await DATA.json()

    USER.repos = REPOS;
}

function getAllData() {
    const USER_INFO = document.getElementById("user-info");

    USER_INFO.setAttribute("style", "display: block"); // Fix the usage of setAttribute

    USER_INFO.innerHTML = `
        <div class="user-info">
            <div class="user-avatar">
                <h2 class="user-name">${USER.name == null ? "no username" : USER.name}</h2>
                <h3 class="user-login">${USER.login}</h3>
                <img class="avatar_img" src="${USER.avatar_url}" alt="${USER.login}"> <!-- Fix the syntax here -->
                <p class="bio">${USER.bio == null ? "no bio" : USER.bio}</p> <!-- Fix the missing backtick -->
            </div>
            <div class="user-stats">
                <h2>Info</h2>
                <p>Repos: ${USER.public_repos} </p>
                <p>Followers: ${USER.followers}</p>
                <p>Following: ${USER.following}</p>
            </div>
        </div>
        ${USER.repos.map((repo) => `
            <div class="repo">
                <h3 class="repo-name">${repo.name} </h3>
                <p class="repo-description">${repo.description == null ? "no description" : repo.description}</p> <!-- Fix the missing backtick -->
                <p class="repo-language">${repo.language == null ? "no language found" : repo.language}</p>
                <div class="repo-stats">
                    <span>${repo.stargazers_count}</span>
                    <span>${repo.watchers_count}</span>
                    <span>${repo.forks_count}</span>
                    <span>${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span> <!-- Fix the property name -->
                </div>
                <a href="${repo.html_url}" target="_blank">
                    <span>${repo.html_url}</span>
                </a>
            </div>`).join("")}
    `;
}
