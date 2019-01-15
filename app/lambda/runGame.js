import {GraphQLClient, request} from 'graphql-request'

function runGame(event, context, callback) {

  console.log(event.body);

  const postBody = JSON.parse(event.body);
  const questionId = postBody.questionId;

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

  function buildGameStartQuery(qId) {
    const endDateTime = new Date();
    endDateTime.setSeconds(endDateTime.getSeconds() + 30);
    const endDateTimeString = endDateTime.toISOString();

    return `
      mutation {
        insert_Game(objects: [
          {
            state: "live"
            questionId: "${qId}"
            endDateTime: "${endDateTimeString}"
          }
        ]) {
          returning {
            id
          }
        }
      }
    `;
  }

  const hasuraURL = 'https://where-in-the-world-hq.herokuapp.com/v1alpha1/graphql';

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Admin-Token': process.env.HASURA_GRAPHQL_ACCESS_KEY,
    'Content-Type': 'application/json',
  };

  const client = new GraphQLClient(hasuraURL, { headers });
  client.request(setLiveToCompleteQuery)
    .then(() => {
      client.request(buildGameStartQuery(questionId))
        .then((data) => {
          const gameId = data.insert_Game.returning[0].id;
          callback(null, {
            statusCode: 200,
            headers,
            body: gameId,
          })
        })
        .catch(err => {
          callback(new Error('runGame function failed. Error code 19836465483'), {
            statusCode: 500,
            headers,
            body: 'Run Game Lambda Failed'
          })
        })
    })
    .catch(err => {
      console.log(err);
      callback(new Error('runGame function failed. Error code 012932041'), {
        statusCode: 500,
        headers,
        body: 'Run Game Lambda Failed'
      })
    })
}

exports.handler = runGame;
