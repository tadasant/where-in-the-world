import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const addPlayer = gql`
  mutation InsertPlayer($name: String!) {
    insert_Player(objects: [{ name: $name }]) {
      returning {
        id
        name
      }
    }
  }
`;

class LoginScreen extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.checkForId();
  };

  checkForId() {
    if(localStorage.getItem("playerId")) {
      this.props.history.push('/game');  
    } 
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .mutate({ variables: { name: this.state.name } })
      .then(({ data }) => {
        localStorage.setItem("witw-playerId", data.insert_Player.returning[0].id);
        this.props.history.push('/game');
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.handleNameChange}
            placeholder="Enter your name"
            value={this.state.name}
          />
          <input type="submit" title="Join" />
        </form>
      </div>
    );
  }
}

// const withResults = graphql(PLAYER_QUERY);

export default graphql(addPlayer)(LoginScreen);
