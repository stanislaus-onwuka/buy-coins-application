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
        console.log("event", event);
        
        const {data} = await axios.post(
            githubUrl,
            { 
                query: query,
                variables: event.queryStringParameters.variables
            }, 
            {headers:{
                "Authorization": `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }}
        );
    
        return{
            statusCode:200,
            body: data
        }
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: "Oops! Something went wrong"
        }
    }
}