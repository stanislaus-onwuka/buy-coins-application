const axios = require('axios');

exports.handler = async (event, context) => {
    const githubUrl = 'https://api.github.com/graphql';

    const token = process.env.TOKEN;

    const auth = {Authorization: 'Bearer ' + token};

    const { searchInputValue } = event.queryStringParameters;

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
            variables: { "queryString": JSON.stringify(searchInputValue)}
        }, 
        {headers: auth}
    )
    .then((response) => {
        console.log(response)
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    })
    .catch((error)=>{
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    })
};