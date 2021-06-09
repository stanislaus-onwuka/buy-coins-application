const axios = require("axios");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}


const { TOKEN } = process.env;

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


exports.handler = async(event,context) =>{
    try {
        
        const {data} = await axios.post(
            githubUrl,
            { 
                query: query,
                variables: { "queryString": event.queryStringParameters.userId }
            }, 
            {headers:{
                "Authorization": `Bearer ${TOKEN}`
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