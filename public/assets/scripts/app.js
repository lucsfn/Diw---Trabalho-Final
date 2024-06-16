
const ageText = document.getElementById('age');

function calculateAge() {
    const birthDate = new Date('2005-06-15');
    const currentDate = new Date();
    const diff = currentDate - birthDate;
    const age = Math.floor(diff / 31557600000);
    return age;
}

let age = calculateAge();
ageText.textContent = `${age} anos`;

const urlSG = "https://back-end-diw-silk.vercel.app/sugested-content";

async function getAllSugestedContent() {
    const response = await fetch(urlSG);
    data = await response.json();

    const imgsContainer = document.getElementById('imgs-container');
    const slideContent = document.getElementById('slide-content');

    data.forEach((post, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = post.image;
        imgElement.alt = post.title;
        imgElement.classList.add('slider');
        if (index === 0) imgElement.classList.add('on');
        imgsContainer.appendChild(imgElement);
    });

    initializeSlider();
    updateContent(0);
}

function initializeSlider() {
    const sliders = document.querySelectorAll('.slider');
    const btnPrev = document.getElementById('prev-btn');
    const btnNext = document.getElementById('next-btn');

    let currentSlide = 0;

    function hideSlider() {
        sliders.forEach(item => item.classList.remove('on'));
    }

    function showSlider() {
        if (sliders[currentSlide]) {
            sliders[currentSlide].classList.add('on');
            updateContent(currentSlide);
        }
    }

    function nextSlider() {
        hideSlider();
        if (currentSlide === sliders.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        showSlider();
    }

    function prevSlider() {
        hideSlider();
        if (currentSlide === 0) {
            currentSlide = sliders.length - 1;
        } else {
            currentSlide--;
        }
        showSlider();
    }

    btnNext.addEventListener('click', nextSlider);
    btnPrev.addEventListener('click', prevSlider);

    setInterval(nextSlider, 30000);
}

function updateContent(index) {
    const slideContent = document.getElementById('slide-content');
    const post = data[index];

    slideContent.innerHTML = '';

    const titleElement = document.createElement('h2');
    titleElement.id = "title_slide";
    titleElement.innerText = post.title;
    slideContent.appendChild(titleElement);

    const descElement = document.createElement('h2');
    descElement.id = "desc_slide";
    descElement.classList.add('infos-text');
    descElement.innerText = post.description;
    slideContent.appendChild(descElement);

    const linkElement = document.createElement('a');
    linkElement.id = "acess_link_sg";
    linkElement.href = post.acesslink;
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('custom-btn', 'btn-14');
    buttonElement.id = "btn_sg";
    buttonElement.innerText = "Veja Mais";
    linkElement.appendChild(buttonElement);
    slideContent.appendChild(linkElement);
}

const username = "lucsfn";
const token = "";
const myselfApiUrl = `https://api.github.com/users/${username}`;

let myselfName = "";
let myselfBio = "";
let myselfLocation = "";
let myselFollowers = "";
let myselfPic = "";
const profileInfo = document.getElementById('profile_info');
const followersDiv = document.querySelector('.follow');
const locationDiv = document.querySelector('.location');
const profilePic = document.getElementById('profile_pic');

async function getMyself() {
    fetch(myselfApiUrl, {
        headers: {
            Authorization: `token ${token}`            
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            myselfName = data.name;
            myselfBio = data.bio;
            myselfLocation = data.location;
            myselFollowers = data.followers;
            myselfPic = data.avatar_url;
            updateMySelf();
        })
        .catch(error => {
            console.error('Ocorreu um erro ao buscar dados do usuário:', error);
        });

    function updateMySelf() {
        const name = document.createElement('h2');
        const bio = document.createElement('p');
        bio.classList.add('desc-text');
        const followers = document.createElement('p');
        followers.classList.add('desc-text');
        const location = document.createElement('p');
        location.classList.add('desc-text');

        name.textContent = myselfName;
        bio.textContent = myselfBio;
        followers.textContent = myselFollowers;
        location.textContent = myselfLocation;
        profilePic.src = myselfPic;

        profileInfo.appendChild(name);
        profileInfo.appendChild(bio);
        followersDiv.appendChild(followers);
        locationDiv.appendChild(location);
    }
}

const urlLinks = "https://back-end-diw-silk.vercel.app/myself-github-links";
let linkedin = "";
let ig = "";
let github = "";

const linkedinLink = document.getElementById('linkedin_link');
const igLink = document.getElementById('instagram_link');
const githubLink = document.getElementById('github_link');

async function getMyLinks() {
    const response = await fetch(urlLinks);
    const data = await response.json();

    return {
        linkedin: data.map(post => post.linkedin),
        github: data.map(post => post.github),
        instagram: data.map(post => post.instagram)
    };
}

async function updateMyLinks() {
    const { linkedin, github, instagram } = await getMyLinks();
    linkedinLink.href = linkedin;
    githubLink.href = github;
    igLink.href = instagram;
}

let coworkerList = ["FredoCmps", "dudu296", "AllefHerique", "Luiz296", "pablomarquesc"];
const coworkerUrl = "";

if (document.querySelector('.coworkers-list')) {
    for (let i = 0; i < coworkerList.length; i++) {
        let coworkerUrl = `https://api.github.com/users/${coworkerList[i]}`;
        getCoworker(coworkerUrl);
    }
}

async function getCoworker(coworkerUrl) {
    try {
        const response = await fetch(coworkerUrl, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        createCoworkerHTML(data);
    } catch (error) {
        console.error('Ocorreu um erro ao buscar dados do colega:', error);
    }
}

function createCoworkerHTML(data) {
    let coworkerContainer = document.createElement("div");
    coworkerContainer.className = "coworker";

    let imgContainer = document.createElement("div");
    imgContainer.className = "coworker-img-container";
    let img = document.createElement("img");
    img.src = data.avatar_url;
    img.alt = data.name;
    img.className = "coworker-picture";
    imgContainer.appendChild(img);

    let link = document.createElement("a");
    link.href = data.html_url;

    let nameHeading = document.createElement("h2");
    nameHeading.id = "coworker_name";
    nameHeading.className = "coworker-name";
    nameHeading.textContent = data.name;

    let usernameParagraph = document.createElement("p");
    usernameParagraph.id = "coworker_username";
    usernameParagraph.className = "coworker-username";
    usernameParagraph.textContent = data.login;

    link.appendChild(nameHeading);
    link.appendChild(usernameParagraph);

    coworkerContainer.appendChild(imgContainer);
    coworkerContainer.appendChild(link);

    const coworkersList = document.querySelector('.coworkers-list');
    if (coworkersList) {
        coworkersList.appendChild(coworkerContainer);
    }
}

const repoContentDiv = document.querySelector('.repos-content');
const repoCountSpan = document.getElementById('repo_count');

async function fetchRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar repositórios.');
        }
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        return [];
    }
}

function createRepoCard(repo) {
    const repoCard = document.createElement('div');
    repoCard.className = 'repo-card';
    repoCard.setAttribute('data-repo-id', repo.id);

    repoCard.innerHTML = `
        <a href="./repo.html?id=${repo.id}">
            <h2 id="repo_name_${repo.id}" class="repo-name">${repo.name}</h2>
        </a>
        <p id="repo_desc_${repo.id}" class="repo-desc">${repo.description || 'Sem descrição disponível.'}</p>
        <div class="repo-secondary-infos">
            <div class="repo-group">
                <i class="fa-solid fa-star icon"></i>
                <p class="desc-text" id="repo_favs_${repo.id}">${repo.stargazers_count}</p>
            </div>
            <div class="repo-group">
                <i class="fa-solid fa-code-fork icon"></i>
                <p class="desc-text" id="repo_forks_${repo.id}">${repo.forks_count}</p>
            </div>
        </div>
    `;
    repoContentDiv.appendChild(repoCard);
}

async function fetchAndDisplayRepos() {
    try {
        const fetchedRepos = await fetchRepos();
        fetchedRepos.forEach(repo => createRepoCard(repo));
        repoCountSpan.textContent = fetchedRepos.length;
    } catch (error) {
        console.error('Erro ao carregar repositórios do GitHub:', error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (document.getElementById('index_specific_element')) {
            await getAllSugestedContent();
            await getMyself();
            await updateMyLinks();
            await fetchAndDisplayRepos();
            await getFooter();
        }
    } catch (error) {
        console.error('Erro durante o carregamento inicial:', error);
    }
});

const repoSpecificElement = document.getElementById('repo_specific_element');
if (repoSpecificElement) {
    const urlParams = new URLSearchParams(window.location.search);
    const repoId = urlParams.get('id');
    if (repoId) {
        loadRepoDetails(repoId);
    } else {
        console.error('ID do repositório não especificado na URL.');
    }
}

async function loadRepoDetails(repoId) {
    try {
        const repoResponse = await fetch(`https://api.github.com/repositories/${repoId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!repoResponse.ok) {
            throw new Error('Erro ao buscar detalhes do repositório.');
        }
        const repoDetails = await repoResponse.json();

        const languagesResponse = await fetch(repoDetails.languages_url, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!languagesResponse.ok) {
            throw new Error('Erro ao buscar linguagens do repositório.');
        }
        const languages = await languagesResponse.json();

        const repoName = document.getElementById('repo_name');
        const repoDesc = document.getElementById('repo_desc');
        const repoDate = document.getElementById('repo_date');
        const repoLangs = document.getElementById('repo_programming_languages');
        const topicsList = document.getElementById('topics');
        const repoStars = document.getElementById('repo_favs');
        const repoForks = document.getElementById('repo_forks');
        const repoLink = document.getElementById('acess_link');

        repoName.textContent = repoDetails.name;
        repoDesc.textContent = repoDetails.description || 'Sem descrição disponível.';
        repoDate.textContent = new Date(repoDetails.created_at).toLocaleDateString();
        repoStars.textContent = repoDetails.stargazers_count;
        repoForks.textContent = repoDetails.forks_count;
        repoLink.href = repoDetails.html_url;

        repoLangs.innerHTML = '';
        topicsList.innerHTML = '';

        if (Object.keys(languages).length === 0) {
            const noLanguagesElement = document.createElement('p');
            noLanguagesElement.textContent = 'Nenhuma linguagem encontrada.';
            noLanguagesElement.classList.add('repo-desc');
            repoLangs.appendChild(noLanguagesElement);
        } else {
            for (const [language, _] of Object.entries(languages)) {
                const langElement = document.createElement('p');
                langElement.classList.add('languages-repo');
                langElement.textContent = language;
                repoLangs.appendChild(langElement);
            }
        }

        if (Object.keys(topics).length === 0) {
            const noTopicElement = document.createElement('p');
            noTopicElement.textContent = 'Nenhuma tópico encontrado.';
            noTopicElement.classList.add('repo-desc');
            topicsList.appendChild(noTopicElement);
        } else {
            repoDetails.topics.forEach(topic => {
                const topicElement = document.createElement('p');
                topicElement.classList.add('topic');
                topicElement.textContent = topic;
                topicsList.appendChild(topicElement);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes do repositório:', error);
    }
}

const urlEI = "https://back-end-diw-silk.vercel.app/extra-infos";

dataFooter = [];

async function getFooter() {
    const response = await fetch(urlEI);
    dataFooter = await response.json();

    const footerName = document.getElementById('footer_name');
    const footerCollege = document.getElementById('footer_college');
    const footerCourse = document.getElementById('footer_course');

    dataFooter.map((post) => {
        footerName.textContent = post.fullname;
        footerCollege.textContent = post.college;
        footerCourse.textContent = post.course;
    });
}

if (repoSpecificElement) {
    getFooter();
}