import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../Components/BusinessList';
import '../Components/SearchBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusineessList />
      </div>
    );
  }
}

export default App;
