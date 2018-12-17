import {GraphQLClient, request} from 'graphql-request'

function killGames(event, context, callback) {

  const setLiveToCompleteQuery = `
    mutation {
      update_Game(
        where: {state: {_eq: "live"}},
        _set: {
          state: "completed"
        }) {
        affected_rows
      }
    }
  `

  const hasuraURL = 'https://where-in-the-world-hq.herokuapp.com/v1alpha1/graphql';

  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  const client = new GraphQLClient(hasuraURL, { headers: {'admin-token': process.env.HASURA_GRAPHQL_ACCESS_KEY} });
  client.request(setLiveToCompleteQuery)
    .then((data) => {
      const n_killed_games = data.update_Game.affected_rows
      callback(null, {
        statusCode: 200,
        headers,
        body: `${n_killed_games} Games killed`,
      })
    })
    .catch(err => {
      callback(new Error('killGames function failed. Error code 56418912'), {
        statusCode: 500,
        headers,
        body: 'Kill Games Lambda Failed'
      })
    })
}

exports.handler = killGames;
