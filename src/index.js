import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let playerNameSubmitted = false;
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// board with bootsrap styling
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

 /*TODO : Name form*/ 
/*class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.players = 
    {
        player1: '',
        player2: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if(this.players.player1.length == 0 ){
        this.players.player1 = "player 1";
    }
   if(this.players.player2.length == 0){
       this.players.player2 = "player 2";
   }
     playerNameSubmitted = true; 
      
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="col-sm-6">
        <label>
            Player 1 (X):
        </label>
          <input name="p1box" type="text" onChange={this.handleInputChange} placeholder="player 1 name" />
        <label>
            Player 2 (O):
        </label>
        <input name="p2box" type="text" onChange={this.handleInputChange} placeholder="player 2 name" />
        </div>
      </form>
    );
  }
}*/


class Game extends React.Component {
  constructor(props) {
    super(props);
      

    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
        player1: '',
        player2: '',
    };
  this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
    
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
      
    });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
      
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let p1 = (this.state.player1 == "") ? "player 1" : this.state.player1;
    let p2 = (this.state.player2 == "") ? "player 2" : this.state.player2;
    let status;
    let victor;

    if (winner) {
        if(winner === "X"){
            victor = p1;
        }
        else{
            victor = p2;
        } 
      status = "Winner: " + victor;
        
    } else {
      status = "Next player: " + (this.state.xIsNext ? p1 : p2);
    }
    return (
      <div className="game" >
        {/*Player names region*/}
        <div class="col-sm-5">
            <label>Player 1 (X):</label>
              <input name="player1" type="text" onChange={this.handleInputChange} placeholder="player 1 name" /> <br/>
            <label>Player 2 (O):</label>
            <input name="player2" type="text" onChange={this.handleInputChange} placeholder="player 2 name" />
        </div>

        {/*Board Region*/}
        <p class="mb-3 h"> WELCOME TO GAME OF TICTACTOE!!!</p>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        {/*Status Region*/}
        
        <div>
          <div  className="game-info"> {status} </div>
          <div className="game-moves"> <ol>{moves}</ol> </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
