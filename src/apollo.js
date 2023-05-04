import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const scheme = (proto) =>
  window.location.protocol === "http:" ? `${proto}` : proto;

const splitter = ({ query }) => {
  const { kind, operation } = getMainDefinition(query) || {};
  const isSubscription =
    kind === "OperationDefinition" && operation === "subscription";
  return isSubscription;
};

const GRAPHQL_ENDPOINT = "collection-voting-1.hasura.app";
const cache = new InMemoryCache();
const options = { reconnect: true };
const HASURA_SECRET = "eKUUl0j58WBR1753anBeFEUL53fiteGS1GLH1DwP5pboiNNCVilrIAW7Tqnni14x";

const wsURI = `${scheme("ws")}://${GRAPHQL_ENDPOINT}/v1/graphql`;
const httpurl = `${scheme("https")}://${GRAPHQL_ENDPOINT}/v1/graphql`;

const wsLink = new GraphQLWsLink(createClient({ url: wsURI, connectionParams: { options, headers:{ 'x-hasura-admin-secret': HASURA_SECRET } } }));
const httpLink = new HttpLink({ uri: httpurl, headers:{'x-hasura-admin-secret': HASURA_SECRET} });
const link = split(splitter, wsLink, httpLink);
const client = new ApolloClient({ link, cache });
export default client;
