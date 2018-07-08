import React, { Component } from 'react'
import ReactDOM from 'react-dom'



class Game extends React.Component{
  constructor(props) { 
    super(props)
    
    let questions = [
      {
        question: "What is 2 + 2",
        answers: ["4", "22", "1", "8"],
        solution: 0
      },
      {
        question: "What is 2 + 5",
        answers: ["4", "7", "1", "8"],
        solution: 1
      },
      {
        question: "What is 2 + 20",
        answers: ["4", "22", "1", "8"],
        solution: 1
      },
      {
        question: "What is 12 + 2",
        answers: ["4", "22", "14", "8"],
        solution: 2
      },
      {
        question: "What is 2 - 2",
        answers: ["4", "22", "1", "0"],
        solution: 3
      },
      {
        question: "What is 2 / 2",
        answers: ["4", "22", "1", "8"],
        solution: 2
      }

    ]

    this.state = {question: questions[0]}
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(index) {
    if (index === this.state.question.solution) {
      console.log("siu");
    } else {
      console.log("no");
    }
  }
  
  render() {
    var style = {
      color: 'red'
    };

    return (
      <div>
        <h1 style={style}>{this.state.question.question}</h1>
        <Board answers={this.state.question.answers} handleClick={this.handleClick}/>
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
    display: "flex",
    justifyContent: "center",
    width: "300px",
    height: "50px",
    color: "blue"
  }
  
  return (
    <button style={style} onClick={() => props.handleClick(props.index)}>
      {props.text}
    </button>
  )
}

const root = document.querySelector('#app')
ReactDOM.render(<Game />, root)
