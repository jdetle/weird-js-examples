import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Foo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  render() {
    const { handleChange } = this.props;
    let _handleChange = handleChange.bind(this);
    return (
      <div>
        <input type='file' onChange={_handleChange} id='input'/>
        <label htmlFor='input'> Upload </label>
        {this.state.error && <span>{this.state.errorMessage}</span>}
      </div>
    )
  }
}


class FooClosure extends Component {
  handleChange = (event) => {
    let self = this // this will always be FooClosure
    debugger // local this context will be Foo
    this.setState({ error: true, errorMessage: 'Some error happened'})
  }
  render() {
    return (
      <div>
        <Foo handleChange={this.handleChange} />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <FooClosure />
      </div>
    );
  }
}

export default App;
