import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const addPlayer = gql`
  mutation InsertPlayer($name: String!, $seenDateTime: timestamptz!) {
    insert_Player(objects: [{ name: $name, lastSeen: $seenDateTime }]) {
      returning {
        id
        name
      }
    }
  }
`;

const LoginHeader = styled.div`
  position: fixed;
  width: 100%;
  background: #ec8d1e;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  margin: 0.6em 0em;
  font-size: 1.3em;
  text-transform: uppercase;
`;

const CreatePlayerForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  margin: 0 1.3em;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 0.3em 0.4em;
  font-size: 1.3em;
  margin: 0.3em 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 350px;
`;

const JoinButton = styled.input`
  background: #db6a3e;
  border: 1px solid #db6a3e;
  font-size: 1.3em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  width: 100%;
  padding: 0.3em 0;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  max-width: 350px;
`;

class LoginScreen extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.checkForId();
  }

  checkForId() {
    if (localStorage.getItem("witw-playerId")) {
      this.props.history.push("/game");
    }
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .mutate({ variables: { name: this.state.name, seenDateTime: new Date().toISOString() } })
      .then(({ data }) => {
        localStorage.setItem(
          "witw-playerId",
          data.insert_Player.returning[0].id
        );
        this.props.history.push("/game");
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };

  render() {
    return (
      <div>
        <LoginHeader>
          <Title>Where in the world?</Title>
        </LoginHeader>

        <CreatePlayerForm onSubmit={this.handleSubmit}>
          <NameInput
            type="text"
            name="name"
            onChange={this.handleNameChange}
            placeholder="Enter your name"
            value={this.state.name}
          />
          <JoinButton type="submit" value="Join Game" />
        </CreatePlayerForm>
      </div>
    );
  }
}

// const withResults = graphql(PLAYER_QUERY);

export default graphql(addPlayer)(LoginScreen);
