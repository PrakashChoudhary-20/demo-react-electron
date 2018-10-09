import React, { Component } from 'react';
import logo from './user.png';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      brands: [],
      apiResponded: false
    }
    this.getAPIResponse = this.getAPIResponse.bind(this);
    this.renderResponseData = this.renderResponseData.bind(this);

  }

  getAPIResponse() {
    this.setState({ isLoaded: true })
    var myHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    //    fetch('https://bbc-tve.skylark.ostmodern.co.uk/api/brands/?current=true', {headers: myHeaders})
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          apiResponded: true,
          brands: json
        })
      });
  }

  renderResponseData(brands) {
    if (this.state.apiResponded) {
      var details = brands.results[0];
      return (<div>
        <p>Name: {details.name.title} {details.name.first} {details.name.last}</p>
        <p>Age: {details.dob.age}</p>
        <p>City: {details.location.city}</p>
        <p>Email: {details.email}</p>
        <button onClick={this.getAPIResponse} className="generate-Report">Fetch Another User</button>
      </div>
      );
    }
    else {
      return <p>API response is loading...</p>
    }
  }
  render() {
    var { isLoaded, brands, apiResponded } = this.state;

    if (isLoaded && apiResponded) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={brands.results[0].picture.large} className="App-logo" alt={brands.results[0].name.first} />
            {this.renderResponseData(brands)}
          </header>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Generate your data by clicking the below button:
            </p>
            <button onClick={this.getAPIResponse} className="generate-Report">
              Generate
            </button>
          </header>
        </div>
      );
    }
  }
}

export default App;
