import {InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as ApolloLink from 'apollo-link';
import { split } from 'apollo-link';
import {onError} from 'apollo-link-error';
import {HttpLink} from 'apollo-link-http';
import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import Routing from './components/Routing';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const graphqlUri = 'https://where-in-the-world-hq.herokuapp.com/v1alpha1/graphql';

const mkWsLink = (uri) => {
  const splitUri = uri.split('//');
  const subClient = new SubscriptionClient(
    'wss://' + splitUri[1],
    { reconnect: true }
  );
  return new WebSocketLink(subClient);
};

const wsLink = new WebSocketLink({
  uri: mkWsLink(graphqlUri),
  options: {
    reconnect: true
  }
});

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: graphqlUri,
  })
]);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routing/>
      </ApolloProvider>
    );
  }
}

export default App;
