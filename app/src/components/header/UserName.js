import gql from 'graphql-tag';
import * as React from 'react';
import {graphql} from 'react-apollo';
import styled from 'styled-components';

const PLAYER_NAME_QUERY = gql`
    query GetPlayer($id: uuid!) {
        Player(where: {id: {_eq: $id}}) {
            name
        }
    }
`;

const NameSpan = styled.span`
  color: white;
`;

const UserName = props => {
  if (!props.data || !props.data.Player || props.data.Player.length < 1) {
    return null;
  }
  return (
    <NameSpan>{props.data.Player[0].name}</NameSpan>
  )
};

const withName = graphql(PLAYER_NAME_QUERY, {
  options: () => {
    return {
      variables: {id: localStorage.getItem('witw-playerId')}
    };
  }
});

export default withName(UserName);
