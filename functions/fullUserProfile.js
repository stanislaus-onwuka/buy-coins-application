const axios = require("axios");

exports.handler = (event, context) => {
    const githubUrl = 'https://api.github.com/graphql';

    const { userId } = event.queryStringParameters;

    const token = process.env.TOKEN;

    const auth = {Authorization: 'Bearer ' + token};

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
            variables: { "queryString": userId ? userId : "stanislaus-onwuka"}
        }, 
        {headers: auth}
    )
    .then((response)=>{

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        }
    })
    .catch(error => {
        console.log("Error: Request handling error");
        console.error(JSON.stringify(error));

        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    })
}