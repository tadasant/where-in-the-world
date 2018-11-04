function runGame(event, context, callback) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  const okay = true;
  const response = {
    'message': 'Successful lambda test!'
  }

  const postBody = JSON.parse(event.body);
  console.log(postBody);

  if (okay) {
    callback(null,
    {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    })
  } else {
    callback(new Error('Failed lambda test'), {
      statusCode: 500,
      headers,
      body: 'not sure if this does anything',
    })
  }
}

exports.handler = runGame;
