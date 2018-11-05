import gql from 'graphql-tag';
import * as React from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

const GAME_IMAGE_QUERY = gql`
    query GetGame($id: uuid!) {
        Game(where: {id: {_eq: $id}}) {
            questions {
                imgURL
            }
        }
    }
`;

const GameImage = props => {
  if (!props.data.Game || !props.data.Game[0].questions) {
    return null;
  }
  return (
    <img alt='game-img' style={{width: "100%", objectFit: "cover"}} src={props.data.Game[0].questions.imgURL}/>
  )
};

GameImage.propTypes = {
  gameId: PropTypes.string,
};

const withImage = graphql(GAME_IMAGE_QUERY, {
  options: ({gameId}) => ({
    variables: {id: gameId}
  })
});

export default withImage(GameImage);
