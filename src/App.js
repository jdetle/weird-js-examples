import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const randomAsync = (i) => {
  let foo = Math.floor((Math.random() * 40) + 1)
  console.log(foo)
  if (foo < 20) {
    return Promise.resolve(setTimeout(foo => foo, foo))
  } else {
    return Promise.reject(setTimeout(foo => foo, foo))
  }
}

class Foo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      resolved: false,
      lis: null
    }
    this.handleChange = this.props.handleChange.bind(this)
  }

  allDone = (promises) => {
    let memo = {}
    let pending = promises.length
    let memoizeAndCheck = (promiseResult, i, resolve) => { 
      memo[i] = promiseResult 
      pending -= 1
      if (pending === 0 ) {
        resolve(memo)
      }
    }
    return new Promise((res, rej) => {
      promises.forEach((promise, i) => {
        promise
        .then((resp) => memoizeAndCheck(resp, i, res))
        .catch((error) => memoizeAndCheck(error, i, res))
      })
    })
  }
  componentDidMount() {
    let promises = [1,2,3,4,5,6,7,8,9,10].map(randomAsync)
    this.allDone(promises).then((data) => { 
      let keys = Object.keys(data)
      let lis = keys.map((key, i) => <li key={`li_${i}`}>{`${i}: ${data[key]}`}</li>)
      this.setState({resolved: true, lis: lis })
    })
  }
  render() {
    return (
      <ul>
        {
          this.state.resolved && (
            this.state.lis
          )
        }
      </ul>
    )
  }
}


class FooClosure extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange;
  }
  handleChange() {
    debugger // local this context will be Foo
    this.setState({ error: true, errorMessage: 'Some error happened'})
  }
  render() {
    console.log('closure state', this.state)
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
