import { GraphQLClient, request } from 'graphql-request'
const geoDist = require('geo-distance');

function computeResult(event, context, callback) {
  const postBody = JSON.parse(event.body);

  const {
    id: answerId,
    latLocation,
    longLocation,
    gameId
  } = postBody.event.data.new;

  const guessLocation = {
    lat: latLocation,
    lon: longLocation,
  }

  const getAnswerQuery = `
    query {
      Game(where: {id: {_eq: "${gameId}"}}) {
        id
        questions {
          id
          latLocation
          longLocation
        }
      }
    }
  `

  const hasuraURL = 'https://where-in-the-world-hq.herokuapp.com/v1alpha1/graphql';

  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  const client = new GraphQLClient(hasuraURL, { headers: {'admin-token': process.env.HASURA_GRAPHQL_ACCESS_KEY} });
  client.request(getAnswerQuery)
    .then((data) => {
      const truthLocation = {
        lat: data.Game[0].questions.latLocation,
        lon: data.Game[0].questions.longLocation,
      }

      const distDiff = geoDist.between(guessLocation, truthLocation);
      let kmDiff;
      if (distDiff.human_readable().unit === 'm') {
        kmDiff = distDiff.human_readable().distance / 1000;
      } else {
        kmDiff = distDiff.human_readable().distance;
      }

      const score = Math.round( kmDiff * 10 ) / 10;

      console.log(distDiff.human_readable());
      console.log(kmDiff);
      console.log(score);

      const addResultQuery = `
        mutation {
          insert_Result(objects: [
            {
              score: ${score},
              answerId: "${answerId}"
            }
          ]) {
            affected_rows
          }
        }
      `;

      client.request(addResultQuery)
        .then((response) => {
          // const n_affected_rows = response.insert_Result.affected_rows;
          callback(null, {
            statusCode: 200,
            headers,
            body: 'success',
          })
        })
        .catch(err => {
          console.log(err);
          callback(new Error('computeResult function failed. Error code 9686744392'), {
            statusCode: 500,
            headers,
            body: 'computeResult Lambda Failed'
          })
        })

    })
    .catch(err => {
      console.log(err);
      callback(new Error('computeResult function failed. Error code 8784003033'),
       {
        statusCode: 500,
        headers,
        body: 'computeResult Lambda Failed'
      })
    })
}

exports.handler = computeResult;
