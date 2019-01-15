import {GraphQLClient, request} from 'graphql-request';
import httpRequest from 'request';

function runGameWrapper(event, context, callback) {


  let {idx=-1} = event.queryStringParameters;

  const getQuestions = `
    query {
      Question {
        id
      }
    }
  `

  const hasuraURL = 'https://where-in-the-world-hq.herokuapp.com/v1alpha1/graphql';
  const runGameEndpoint = 'runGame';

  let runGameURL = `https://witworld.live/.netlify/functions/${runGameEndpoint}`;
  const host = event.headers.host;
  if (host !== undefined && typeof host === 'string') {
    if (host.includes('localhost')) {
      runGameURL = `http://localhost:9000/${runGameEndpoint}`
    }
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  const client = new GraphQLClient(hasuraURL, { headers: {'Admin-Token': process.env.HASURA_GRAPHQL_ACCESS_KEY} });
  client.request(getQuestions)
    .then((data) => {
      const questions = data.Question;
      const nQuestions = questions.length;
      if (idx === -1) {
        idx = getRandomIntInclusive(0, nQuestions);
        console.log('random');
      }

      idx = idx % nQuestions;
      const questionId = questions[idx].id;

      httpRequest(
        {
          method: 'Post',
          uri: runGameURL,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            "questionId": `${questionId}`
          },
          json: true,
        }, function(error, response, body) {
          console.log('**error:', error);
          console.log('**body:', body);
          if (error != null) {
            callback(new Error('runGameWrapper function failed. Error code 6578641122'), {
              statusCode: 500,
              headers,
              body: 'Run Game Wrapper Lambda Failed',
            })
          }
          callback(null, {
            statusCode: 200,
            headers,
            body: 'Game Initiated!',
          })
        }
      )
    })
    .catch(err => {
      console.log(err);
      callback(new Error('runGameWrapper function failed. Error code 4567812282'), {
        statusCode: 500,
        headers,
        body: 'Run Game Wrapper Lambda Failed'
      })
    })
}

exports.handler = runGameWrapper;
