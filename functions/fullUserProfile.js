const axios = require("axios");

exports.handler = (event, callback) => {
    const githubUrl = 'https://api.github.com/graphql';

    const { queryString } = event.queryStringParameters;

    const token = process.env.TOKEN;

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


    axios.post(
        githubUrl,
        { 
            query: query,
            variables: { "queryString": "stanislaus-onwuka"}
        }, 
        {headers:{
            "Authorization": `Bearer ${token}`
        }}
    )
    .then((response)=>{
        console.log(response)
        callback(null,{
            statusCode: 200,
            body: JSON.stringify(response.data)
        })
    })
    .catch(error => {
        console.log("Error: Request handling error");
        callback(JSON.stringify(error))
    })
}