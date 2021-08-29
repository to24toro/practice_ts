import React from 'react';
import { Layout } from './components/Layout';
import {  ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { StoreContextProvider } from './store/store';

// const client = new ApolloClient({
//   uri: "https://slack-clone-hasura-jp.herokuapp.com/v1/graphql",
//   cache: new InMemoryCache()
// });

const httpLink = new HttpLink({
  uri: `https://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  headers: {
    'x-hasura-access-key': process.env.REACT_APP_HASURA_ADMIN_SECRET
  }
});

const wsLink = new WebSocketLink({
  uri: `wss://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-access-key': process.env.REACT_APP_HASURA_ADMIN_SECRET
      }
    }
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
    <StoreContextProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Layout />
        </div>
      </ApolloProvider>
    </StoreContextProvider>
    
  );
};

export default App;
