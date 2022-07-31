import { ApolloClient, InMemoryCache } from "@apollo/client"
import { enviroments } from "../../../env/enviroments";

const host = enviroments.graphql.host;
const port = enviroments.graphql.port;

const client = new ApolloClient({
    uri: `${host}:${port}`,
    cache: new InMemoryCache(),
});

export { client as clientGraphql }