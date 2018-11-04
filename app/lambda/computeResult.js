import { request } from 'graphql-request'
const geoDist = require('geo-distance');

function computeResult(event, contect, callback) {
  const postBody = JSON.parse(event.body);

  console.log(postBody);
  const latLocation = postBody.event.data.new.latLocation;
  const longLocation = postBody.event.data.new.longLocation;
  const gameId = postBody.event.data.new.gameId;
  const playerId = postBody.event.data.new.playerId;

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

  console.log(getAnswerQuery);

  const hasuraURL = 'https://where-in-the-world-hq.herokuapp.com/v1alpha1/graphql';

  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  request(hasuraURL, getAnswerQuery)
    .then((data) => {
      console.log(data.Game[0].questions.latLocation);
      console.log(data.Game[0].questions.longLocation);
      const truthLocation = {
        lat: data.Game[0].questions.latLocation,
        long: data.Game[0].questions.longLocation,
      }

      const distDiff = geoDist.between(guessLocation, truthLocation);
      const kmDiff = distDiff.human_readable().distance;

      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      })

    })


}

exports.handler = computeResult;
