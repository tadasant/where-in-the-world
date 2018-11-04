import { request } from 'graphql-request'

function runGame(event, context, callback) {

  const postBody = JSON.parse(event.body);
  const questionId = postBody.questionId;

  console.log(questionId);

  const endDateTime = new Date();
  endDateTime.setSeconds(endDateTime.getSeconds() + 30);

  const endDateTimeString = endDateTime.toISOString();

  const gameStartQuery = `
    mutation {
      insert_Game(objects: [
        {
          state: "live"
          questionId: "${questionId}"
          endDateTime: "${endDateTimeString}"
        }
      ]) {
        returning {
          id
        }
      }
    }
  `



  const hasuraURL = 'https://where-in-the-world-hq.herokuapp.com/v1alpha1/graphql';

  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  request(hasuraURL, gameStartQuery)
    .then(data => {
      const gameId = data.insert_Game.returning[0].id;

      const gameCompleteQuery = `
        mutation {
          update_Game(
            where: {id: {_eq: "${gameId}"}},
            _set: {
              state: "completed"
            }) {
            affected_rows
          }
        }
      `

      setTimeout(() => {
        request(hasuraURL, gameCompleteQuery)
          .then(data => {
            callback(null, {
              statusCode: 200,
              headers,
              body: 'done',
            })
          })
          .catch(err => {
            callback(new Error('runGame function failed. Error code 19836465483'), {
              statusCode: 500,
              headers,
              body: 'Run Game Lambda Failed'
            })
          })
      }, 30*1000);
    })
    .catch(err => {
      callback(new Error('runGame function failed. Error code 012932041'), {
        statusCode: 500,
        headers,
        body: 'Run Game Lambda Failed'
      })
    })
}

exports.handler = runGame;
