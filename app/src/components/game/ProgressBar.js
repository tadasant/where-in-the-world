import React, { Component } from "react";
import styled from "styled-components";
import differenceInSeconds from "date-fns/difference_in_seconds";

const ProgressBarContainer = styled.div`
  width: 100%;
  background: #db6a3e;
  height: 40px;
  position: absolute;
  bottom: 0;
`;

const Progress = styled.div`
  height: 40px;
  width: ${props => props.timeLeft * (100/30)}%;
  background: hsl(16.8, 68.6%, 28.1%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SecondsLeft = styled.span`
  color: #fff;
  padding-right: .3em;
  font-size: .8em;
`;

class ProgressBar extends Component {
  state = {
    timeLeft: 30,
    intervalId: null,
  };

  componentDidMount() {
    var intervalId = setInterval(this.updateTimeLeft, 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  updateTimeLeft = () => {
    let now = new Date();
    let timeLeft = differenceInSeconds(this.props.endDateTime, now);
    if (timeLeft >= 0) {
      this.setState({ timeLeft });
    }
  };

  render() {
    return <ProgressBarContainer>
        <Progress timeLeft={this.state.timeLeft}>
          <SecondsLeft>{this.state.timeLeft}</SecondsLeft>
        </Progress>
      </ProgressBarContainer>;
  }
}

export default ProgressBar;
