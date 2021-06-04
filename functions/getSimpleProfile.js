const axios = require('axios');

exports.handler = async (event, callback) => {
    const githubUrl = 'https://api.github.com/graphql';

    const token = process.env.TOKEN;

    const { queryString } = event.queryStringParameters;

    // GraphQL query
    const query = 
    `query SearchUsers($queryString: String!){
        search(query: $queryString, type: USER, first: 5) {
            repositoryCount
            edges {
                node {
                    ... on User {
                        id
                        avatarUrl
                        login
                        name
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
    .then((response) => {
        console.log(response)
        callback(null,{
            statusCode: 200,
            body: JSON.stringify(response.data)
        })
    })
    .catch((error)=>{
        console.log("Error: Request handling error");
        callback(JSON.stringify(error))
    })
};