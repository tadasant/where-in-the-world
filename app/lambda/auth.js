/*
  Returns `public` policy unless admin-token is sent.

  admin-token must be equal to environment variable HASURA_ADMIN_TOKEN

  Should be a POST request with admin-token in body
 */

function auth(event, context, callback) {
  const postBody = JSON.parse(event.body);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (postBody['headers']['admin-token']) {
    if (postBody['headers']['admin-token'] === process.env.HASURA_ADMIN_TOKEN) {
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          'X-Hasura-Role': 'admin'
        }),
      })
    } else {
      callback(new Error('Invalid admin-token'), {
        statusCode: 401,
        headers,
      })
    }
  } else {
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        'X-Hasura-Role': 'public'
      }),
    })
  }
}

exports.handler = auth;
