const listRepos = async username => {
    const repos = await fetch(
        `https://api.github.com/users/${username}/repos?type=owner&sort=updated`
    )
    .then(res => res.json())
    .catch(error => console.error(error));

    const listItems = Array.isArray(repos) ?
        repos
            .map(
                repo => `
                    <li>
                        <a href="${repo.html_url}">${repo.name}</a>
                        (⭐️ ${repo.stargazers_count})
                    </li>
                `
            )
            .join('')
        : undefined;

    const content = document.getElementById('content');
    content.innerHTML = listItems ? `<ul>${listItems}</ul>` : 'No results found';
}

const usernameInput = document.getElementById('username-input');
usernameInput.value = 'jlengstorf';
usernameInput.onchange = (e) => {
    listRepos(e.target.value);
}

listRepos(usernameInput.value);
