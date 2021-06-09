const axios = require("axios");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const { TOKEN } = process.env;
const githubUrl = 'https://api.github.com/graphql';

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


exports.handler = async(event,context) =>{
    try {
        const { data } = await axios.post(
            githubUrl,
            { 
                query: query,
                variables: { "queryString": event.queryStringParameters.username}
            }, 
            {headers:{
                "Authorization": `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }}
        );
    
        return{
            statusCode:200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        console.error("error.response.data", error.response.data);

        return {
            statusCode: 500,
            body: "Oops! Something went wrong"
        }
    }
}