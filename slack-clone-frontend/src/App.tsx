import React from 'react';
import { Layout } from './components/Layout';
import {  ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// const client = new ApolloClient({
//   uri: "https://slack-clone-hasura-jp.herokuapp.com/v1/graphql",
//   cache: new InMemoryCache()
// });

const httpLink = new HttpLink({
  uri: "https://slack-clone-hasura-jp.herokuapp.com/v1/graphql",

});

const wsLink = new WebSocketLink({
  uri: "ws://slack-clone-hasura-jp.herokuapp.com/v1/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});


const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout />
      </div>
    </ApolloProvider>
  );
};

export default App;
