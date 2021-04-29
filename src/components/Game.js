import React from 'react';
import Board from './Board';
import calculateWinner from './CalculateWinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import xIsNextReducer from '../reducers/x-is-next-reducer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      // stepNumber: 0,
      // xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.props.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    // squares[i] = this.state.xIsNext ? 'X' : 'O';
    squares[i] = this.props.xIsNext ? 'X' : 'O';
    
    const { dispatch } = this.props;
    const action = {
      type: 'TOGGLE_NEXT'
    }
    this.props.dispatch(action);
    
    const moveAction = {
      type: 'SET_STEP',
      stepNumber: history.length
    }
    this.props.dispatch(moveAction);

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      // stepNumber: history.length,
      // xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    const { dispatch } = this.props;
    const action = {
      type: 'NEXT_PLAYER',
      xIsNext: (step % 2) === 0,
    }
    this.props.dispatch(action);
    const moveAction = {
      type: 'SET_STEP',
      stepNumber: step,
    }
    this.props.dispatch(moveAction);
    // this.setState({
      // xIsNext: (step % 2) === 0,
    // });
  }

  render() {
    const history = this.state.history;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((_step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      // status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }
    return (
      <>
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  xIsNext: PropTypes.bool,
  stepNumber: PropTypes.number
};

const mapStateToProps = state => {
  return {
    xIsNext: state.xIsNext,
    stepNumber: state.stepNumber
  }
};

Game = connect(mapStateToProps)(Game);

export default Game;
