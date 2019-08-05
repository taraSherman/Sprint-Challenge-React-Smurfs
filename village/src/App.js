import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    // initial state = empty array
    this.state = {
      smurfs: [],
    };
  }

  // request to set new state 
  updateVillage = newSmurfs => {
    this.setState({
      smurfs: newSmurfs
    })
  }

  // GET data from the server; set state if resolved; show error if rejected
  componentDidMount() {
    axios
        .get('http://localhost:3333/smurfs') 
        .then(response => 
          this.setState({
            smurfs: response.data
          }))
        .catch(err =>
          console.log('Error: ', err))
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav>
          <p>
            <NavLink to="/">Home</NavLink>
          </p>
          <p>
            <NavLink to="/smurf-form">Add a Smurf to the Village</NavLink>
          </p>
        </nav>
        <Route exact path="/" render={props => ( <Smurfs {...props} smurfs={this.state.smurfs}/> )} />
        <Route path="/smurf-form" render={props => ( <SmurfForm {...props} updateVillage={this.updateVillage} /> )} />
      </div>
    );
  }
}

export default App;
