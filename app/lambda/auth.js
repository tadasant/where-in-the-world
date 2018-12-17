/*
  Returns `public` policy unless admin-token is sent.

  admin-token must be equal to environment variable HASURA_GRAPHQL_ACCESS_KEY

  Should be a POST request with admin-token in body
 */

function auth(event, context, callback) {
  console.log(event);
  const postBody = JSON.parse(event.body || '{}');
  console.log(`body: ${postBody}`);


  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if ('headers' in postBody) {
    if (postBody['headers']['admin-token']) {
      if (postBody['headers']['admin-token'] === process.env.HASURA_GRAPHQL_ACCESS_KEY) {
        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            'X-Hasura-Role': 'admin'
          }),
        });
        return;
      } else {
        callback(new Error('Invalid admin-token'), {
          statusCode: 401,
          headers,
        });
        return;
      }
    }
  }
  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      'X-Hasura-Role': 'public'
    }),
  })
}

exports.handler = auth;
