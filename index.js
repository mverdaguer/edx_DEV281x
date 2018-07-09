import React, { Component } from 'react'
import ReactDOM from 'react-dom'
 
function InputText(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <input name={props.name} value={props.value} onChange={props.handleChange}/>
    </div>
  )
}

function SelectElement(props) {
  let options = props.options.map((item) =>
    <option key={item} value={item}>{item}</option>
  )

  return (
    <div>
      <h3>{props.title}</h3>
      <select name={props.name} value={props.value} onChange={props.handleChange}>
        {options}
      </select>
    </div>
  )
}

function CheckboxElement(props) {
  let options = [];
  for (let key in props.options) {
    options.push(<div key={key}>
      <input value={key} type="checkbox" checked={props.values[key]} onChange={props.handleChekboxChange}/>{props.options[key]}
    </div>)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      {options}
    </div>
  )
}



function PostButton(props) {
  var style = {
      width:24,
      height:24
  }
  return (
      <button style = {style} onClick = { () => props.handleClick()}>{props.label}</button>
  )
}

function PostText(props) {
  var style = {
      border:"1px solid black",
      width: props.width
  }
  return (
      <div style = {style}>{props.text}</div>
  )
}

function Post(props) {
  var style = {
      display:"flex"
  }
  return (
      <div style = {style}>
          <PostButton label = "x" handleClick = {props.removeItem}/>
          <PostText text = {props.title} width = "200"/>
      </div>
  )
}

function PostList(props) {
  return (
      <ol>
      {
          props.postList.map((item, index) => 
              <Post key = {index} 
                    title = {item.title}
                    removeItem = {() => props.removeItem(index)}
              />
           )
       }
      </ol>
  )  
}

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {checkedValues: {}, items: []}
      this.handleChange = this.handleChange.bind(this);
      this.handleChekboxChange = this.handleChekboxChange.bind(this);
  } 

  handleChange(event) {
    let target = event.target;

    this.setState((prevState) => {
      prevState[target.name] = target.value;
      return prevState;
    });
  }

  handleChekboxChange(event) {
    let target = event.target;

    this.setState((prevState) => {
      let checkedValues = this.state.checkedValues;
      checkedValues[target.value] = target.checked;

      prevState.checkedValues = checkedValues;
      console.log(prevState)
      return prevState;
    });
  }

  addItem() {

      var itemsCopy = this.state.items.slice()
      var truncatedString = this.state.value.substring(0,20);
      itemsCopy.push({"title":truncatedString})
      
      this.setState({items:itemsCopy, value:""})
  }
  
  removeItem(index) {
      var itemsCopy = this.state.items.slice()
      itemsCopy.splice(index,1);
      this.setState({items:itemsCopy})
  }

  render(){
    let selectOptions = ["Science Lab", "Swimming", "Cooking", "Painting"];
    let checkboxOptions = {
      'a': "Dietary Restrictions",
      'b': "Physical Disabilities",
      'c': "Medical Needs"
    }

    return (
        <div>
            <InputText title="First Name" 
                      name="firstName" 
                      value={this.state.firstName} 
                      handleChange={this.handleChange}/>
            <InputText title="Last Name" 
                      name="lastName" 
                      value={this.state.lastName} 
                      handleChange={this.handleChange.bind(this)}/>
            <SelectElement title="Select Activity"
                      options={selectOptions}
                      name="activity"
                      value={this.state.activity} 
                      handleChange={this.handleChange.bind(this)}/>
            <CheckboxElement title="Check all that apply:"
                      options={checkboxOptions}
                      name="checkedValues"
                      values={this.state.checkedValues} 
                      handleChekboxChange={this.handleChekboxChange.bind(this)}/>


            <input value = {this.state.value} onChange = {this.handleChange.bind(this)}/>
            <button onClick = { () => this.addItem()}>Submit</button>
            <PostList postList = {this.state.items}
                      removeItem = {this.removeItem.bind(this)}
            />

        </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app")
)