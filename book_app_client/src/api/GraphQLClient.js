import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
      console.log(graphQLErrors);
  }

  if (networkError) {
      console.log(networkError);
  }
});
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

const appLink = from([
  errorLink, httpLink
])

const GraphQLClient = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache()
});

export default GraphQLClient;
