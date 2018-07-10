import React, { Component } from 'react'
import ReactDOM from 'react-dom'
 
function InputText(props) {
  const titleStyle = {
    marginBottom: 0
  };

  const inputStyle = {
    height: 30,
    width: 175
  };

  return (
    <div>
      <h3 style={titleStyle}>{props.title}</h3>
      <input style={inputStyle} name={props.name} value={props.value} onChange={props.handleChange}/>
    </div>
  )
}

function SelectElement(props) {
  const titleStyle = {
    marginBottom: 0
  };

  const selectStyle = {
    height: 30,
    width: 175
  };

  const options = props.options.map((item) =>
    <option key={item} value={item}>{item}</option>
  )

  return (
    <div>
      <h3 style={titleStyle}>{props.title}</h3>
      <select style={selectStyle} name={props.name} value={props.value} onChange={props.handleChange}>
        {options}
      </select>
    </div>
  )
}

function CheckboxElement(props) {
  const titleStyle = {
    marginBottom: 0
  };

  const options = [];
  for (const key in props.options) {
    options.push(<div key={key}>
      <input value={key} type="checkbox" checked={props.values[key]} onChange={props.handleChekboxChange}/>{props.options[key]}
    </div>)
  }

  return (
    <div>
      <h3 style={titleStyle}>{props.title}</h3>
      {options}
    </div>
  )
}

function RemoveButton(props) {
  const style = {
    width: 24,
    height: 24
  };

  return (
    <button style={style} onClick = {() => props.handleClick()}>{props.label}</button>
  )
}

function Registration(props) {
  const style = {
    display:"flex"
  };

  return (
    <tr>
      <td><RemoveButton label="x" handleClick={props.removeItem}/></td>
      <td><b>{props.firstName}</b></td>
      <td><b>{props.lastName}</b></td>
      <td><b>{props.activity}</b></td>
      <td><b>{props.restrictions}</b></td>
    </tr>
  )
}

function RegistrationList(props) {
  const tableStyle = {
    width: 800,
    marginTop: 10,
    textAlign: 'center'
  };

  return (
    <table style={tableStyle}>
      <tbody>
        <tr>
          <th>Remove</th>
          <th>First Name</th> 
          <th>Last Name</th>
          <th>Activity</th>
          <th>Restrictions</th>
        </tr>
        {
        props.registrations.map((item, index) => 
          <Registration key={index} 
                firstName={item.firstName}
                lastName={item.lastName}
                activity={item.activity}
                restrictions={item.restrictions}
                removeItem={() => props.removeItem(index)}
          />
          )
        }
      </tbody>
    </table>
  )  
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initializeState();
    this.state.items = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleChekboxChange = this.handleChekboxChange.bind(this);
  } 

  initializeState() {
    return {
      checkedValues: {
        a: false,
        b: false,
        c: false
      }, 
      activity: 'Science Lab',
      firstName: '',
      lastName: ''
    };
  }

  handleChange(event) {
    const target = event.target;

    this.setState((prevState) => {
      prevState[target.name] = target.value;
      return prevState;
    });
  }

  handleChekboxChange(event) {
    const target = event.target;

    this.setState((prevState) => {
      let checkedValues = this.state.checkedValues;
      checkedValues[target.value] = target.checked;

      prevState.checkedValues = checkedValues;
      return prevState;
    });
  }

  addItem() {
    let itemsCopy = this.state.items.slice();

    let newItem = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      activity: this.state.activity,
      restrictions: ''
    };

    for (const key in this.state.checkedValues) {
      if (this.state.checkedValues[key]) {
        newItem.restrictions += key;
      }
    }

    itemsCopy.push(newItem);

    let newState = this.initializeState();
    newState.items = itemsCopy;
    this.setState(newState);
  }
  
  removeItem(index) {
      var itemsCopy = this.state.items.slice();
      itemsCopy.splice(index,1);
      this.setState({items:itemsCopy})
  }

  render() {
    const buttonStyle = {
      marginTop: 10,
      height: 30,
      width: 175
    };

    const selectOptions = ["Science Lab", "Swimming", "Cooking", "Painting"];
    const checkboxOptions = {
      'a': "Dietary Restrictions",
      'b': "Physical Disabilities",
      'c': "Medical Needs"
    };

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

            <button style={buttonStyle} onClick={() => this.addItem()}>Submit</button>
            <RegistrationList registrations={this.state.items}
                      removeItem={this.removeItem.bind(this)}/>
        </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app")
)