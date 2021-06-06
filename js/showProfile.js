const userId = JSON.parse(sessionStorage.getItem("user"));
const repoCount = document.querySelectorAll(".repo-count");
const userProfile = document.querySelector(".user-profile")
const userRepositories = document.querySelector(".user-repositories");
const userAvatar = document.querySelector(".avatar-icon-img");


const githubUrl = 'https://api.github.com/graphql';

const query = 
        `query SearchUser($queryString: String!) {
            user(login: $queryString) {
            avatarUrl
            login
            name
            bio
            repositories(first: 20) {
                totalCount
                edges {
                node {
                    id
                    url
                    name
                    forkCount
                    description
                    updatedAt
                    stargazerCount
                    primaryLanguage {
                    color
                    name
                    }
                }
                }
                
            }
            }
        }   
`;

document.addEventListener("DOMContentLoaded",async ()=>{
    
    const fetchToken = await fetch("https://github-users-buycoins.netlify.app/.netlify/functions/getToken");

    let tokenValue = await fetchToken.text()

    axios.post(
        githubUrl,
        { 
            query: query,
            variables: { "queryString": userId ? JSON.stringify(userId) : "stanislaus-onwuka"}
        }, 
        {headers:{
            "Authorization": `Bearer ${tokenValue}`
        }}
    )
    .then((response)=>{
        console.log(response)
        const { user } = response.data.data;

        repoCount.forEach((count)=>{
            count.innerHTML = `${user.repositories.totalCount}`
        })

        // Update menu avatar
        userAvatar.src = `${user.avatarUrl}`;

        const userProfileContent = `
            <div class="user-img">
                <img src="${user.avatarUrl}"/>
                <div class="set-emotion">
                    <img src="/assets/icons/ph_smiley.svg">
                </div>
            </div>
            <div class="user-details">
                <h3 class="name">${user.name}</h3>
                <h4 class="username">${user.login}</h4>
                <p class="bio">${user.bio === null ? "" : user.bio}</p>
            </div>
        `

        // Add to User profile
        userProfile.innerHTML = userProfileContent;


        // Repositories data
        const repoList = document.createElement("ul");
        
        repoList.className="repo-list";

        let {edges} = user.repositories;

        edges.map((repository)=>{

            let repoListItem = document.createElement("li");
            repoListItem.setAttribute("class","repo")
            repoListItem.setAttribute("id",repository.node.id)

            // Changing to standard date format
            let updated_at_time = new Date(repository.node.updatedAt)

            const repositoryDetails = `
                <div class="repo-details">
                    <a href="${repository.node.url}" class="repo-name">${repository.node.name}</a>
                    <p class="repo-details">${repository.node.description === null ? "" : repository.node.description}</p>
                    <div class="repo-info">
                        <div style="display: ${repository.node.primaryLanguage === null ? 'none' : "flex" };" class="most-used-tech">
                            <div class="tech-color" style="background-color: ${repository.node.primaryLanguage === null ? '#fff' : repository.node.primaryLanguage.color };"></div>
                            <h5 class="tech-name">${repository.node.primaryLanguage === null ? "Unavailable" : repository.node.primaryLanguage.name}</h5>
                        </div>
                        <div class="stars">
                            <div class="star-icon">
                                <img src="assets/icons/clarity_star-line.svg"/>
                            </div>
                            <h5 class="star-count">${repository.node.stargazerCount}</h5>
                        </div>
                        <div class="forks">
                            <div class="fork-icon">
                                <img src="assets/icons/jam_fork.svg"/>
                            </div>
                            <h5 class="forks-count">${repository.node.forkCount}</h5>
                        </div>
                        <p class="last-update">Updated on ${updated_at_time.toLocaleDateString('en-US',{month:'long', day:'2-digit', year:'numeric',hour:'2-digit'})}</p>
                    </div>
                </div>
                <div class="star-repo">
                    <button class="star-repo-btn">
                        <img src="assets/icons/clarity_star-line.svg"/>
                        <h3>Star</h3>
                    </button>
                </div>
            `

            // Append to Repositories list
            repoListItem.innerHTML = repositoryDetails;
            repoList.appendChild(repoListItem);
        })
        
        // Add to DOM
        userRepositories.appendChild(repoList);
    })
})