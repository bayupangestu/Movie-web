import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cartier-server-orchestrator.herokuapp.com",
  cache: new InMemoryCache(),
});

export default client;
