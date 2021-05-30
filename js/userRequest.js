// Query Selectors
const searchInput = document.querySelector("#search-input-value");
const searchForm = document.querySelector("#search-form");
const clearSearchBtn = document.getElementById("clear-search-btn");
const searchResults = document.getElementById("search-results");



const githubUrl = 'https://api.github.com/graphql'

const token = "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"

const auth = {Authorization: 'bearer ' + token};


const query = 
`query SearchUsers($queryString: String!){
    search(query: $queryString, type: USER, first: 5) {
        repositoryCount
        edges {
            node {
                ... on User {
                    id
                    bio
                    avatarUrl
                    login
                    name
                    bioHTML
                    email
                    url
                }
            }
        }
    }
} 
`


// searchForm.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     console.log(searchInput.value)
//     axios.post(
//         githubUrl,
//         { 
//             query: query,
//             variables: { "queryString": JSON.stringify(searchInput.value)}
//         }, 
//         {headers: auth}
//     )
//     .then(function (response) {
//         const { edges } = response.data.data.search
//         const searchResultList = document.createElement("ul");
//         console.log(response.data)
//         if(edges.length > 0){
//             edges.map((result)=>{
//                 let searchResult = result.node;
//                 let { avatarUrl,login,name } = searchResult;
//                 const searchResultListItem = `
//                     <li>
//                         <a class="search-result">
//                             <div class="avatar">
//                                 <img src="${avatarUrl}"/>
//                             </div>
//                             <div class="user">
//                                 <h3 class="name">${name}</h3>
//                                 <p class="login">${login}</p>
//                             </div>
//                         </a>
//                     </li>
//                 `
//                 searchResultList.innerHTML = searchResultListItem 
//             })
//             searchResults.appendChild(searchResultList)
            
//         }else if(edges.length === 0){
//             console.log("empty")
//         }
        
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// })


searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
})


searchInput.addEventListener("input",(e)=>{
    e.preventDefault();

    console.log(searchInput.value)

    searchResults.style.display = 'block';
    

    axios.post(
        githubUrl,
        { 
            query: query,
            variables: { "queryString": JSON.stringify(searchInput.value)}
        }, 
        {headers: auth}
    )
    .then(function (response) {
        const { edges } = response.data.data.search
        const searchResultList = document.createElement("ul");
        console.log(response.data)

        if(edges.length > 0){
            const filteredResults = edges.filter(result=>{
                const searchValue = searchInput.value.toLowerCase();
                const userNameMatches = result.node.login.toLowerCase().includes(searchValue);
                return userNameMatches;
            })

            filteredResults.sort().map((result)=>{
                let searchResult = result.node;
                let { id,avatarUrl,login,name } = searchResult;
                const searchResultListItem = `
                    <li id="${id}" class="search-result">
                        <a class="search-result">
                            <div class="avatar">
                                <img src="${avatarUrl}"/>
                            </div>
                            <div class="user">
                                <h3 class="name">${name}</h3>
                                <p class="login">${login}</p>
                            </div>
                        </a>
                    </li>
                `
                searchResultList.innerHTML = searchResultListItem 
            })
            searchResults.appendChild(searchResultList)
            
        }else if(edges.length === 0){
            console.log("empty")
        }
        
    })
    .catch(function (error) {
        console.log(error);
    });

    // Clear state
    if(searchInput.value.length === 0){
        searchForm.reset();
        searchResults.style.display = 'none';
    }

    if(searchInput.value === ""){
        clearSearchBtn.style.display = "none";
    }
    
})

document.querySelectorAll(".search-result").forEach((searchResult) =>{
    searchResult.addEventListener('click',(e)=>{
        console.log(e.target)
    })
})


// Clear input state

clearSearchBtn.addEventListener('click',()=>{
    searchForm.reset();
    searchResults.textContent = '';
})








avatarUrl: "https://avatars.githubusercontent.com/u/43853290?u=b8d2cccbcbb74ebc0aba9b64d41a0c953657b470&v=4"
bio: "Frontend Web Developer, UI/UX enthusiast. I love beautiful websites. "
bioHTML: "<div>Frontend Web Developer, UI/UX enthusiast. I love beautiful websites. </div>"
email: ""
id: "MDQ6VXNlcjQzODUzMjkw"
login: "stanislaus-onwuka"
name: "Onwuka Stanley C"
url: "https://github.com/stanislaus-onwuka"
