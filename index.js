import React, { Component } from 'react'
import ReactDOM from 'react-dom'

let questions = [
  {
    question: 'What is 2 + 2',
    answers: ['4', '22', '1', '8'],
    solution: 0
  },
  {
    question: 'What is 2 + 5',
    answers: ['4', '7', '1', '8'],
    solution: 1
  },
  {
    question: 'What is 2 + 20',
    answers: ['4', '22', '1', '8'],
    solution: 1
  },
  {
    question: 'What is 12 + 2',
    answers: ['4', '22', '14', '8'],
    solution: 2
  },
  {
    question: 'What is 2 - 2',
    answers: ['4', '22', '1', '0'],
    solution: 3
  },
  {
    question: 'What is 2 / 2',
    answers: ['4', '22', '1', '8'],
    solution: 2
  }
];

class Game extends React.Component{

  constructor(props) { 
    super(props)

    this.state = {question: questions[0], correct: 0, incorrect: 0}
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(index) {
    this.setState((prevState, props) => {
      let i = Math.floor((Math.random() * questions.length))
      if (index === this.state.question.solution) {
        return {
          question: questions[i],
          correct: prevState.correct + 1,
          incorrect: prevState.incorrect
        }
      } else {
        return {
          question: questions[i],
          correct: prevState.correct,
          incorrect: prevState.incorrect + 1
        }
      }
    })
  }
  
  render() {
    var h1Style = {
      color: 'red',
      textAlign: 'center'
    };

    var style = {
      display: 'flex'
    };

    return (
      <div style={style}>
        <div>
          <h1 style={h1Style}>{this.state.question.question}</h1>
          <Board answers={this.state.question.answers} handleClick={this.handleClick}/>
        </div>
        <Solution correct={this.state.correct} incorrect={this.state.incorrect}/>
      </div>
    )
  }
}

function Board(props) {
  var answers = []
  for (let i = 0; i < 4; i++) {
    answers.push(<Answer index={i} key={i} text={props.answers[i]} handleClick={props.handleClick}/>)
  }
  return (
    <div>
      {answers}
    </div>
  )
}

function Answer(props) {
  var style = {
    display: 'flex',
    justifyContent: 'center',
    width: '300px',
    height: '50px',
    color: 'blue'
  };
  
  return (
    <button style={style} onClick={() => props.handleClick(props.index)}>
      {props.text}
    </button>
  )
}

function Solution(props) {
  var style = {
    'paddingLeft': '50px',
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center'
  };

  return (
    <div style={style}>
      <h3>Correct: {props.correct}</h3>
      <h3>Incorrect: {props.incorrect}</h3>
    </div>
  )
}

const root = document.querySelector('#app')
ReactDOM.render(<Game />, root)
