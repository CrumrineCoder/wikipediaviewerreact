import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      </div>
    );
  }
}

class Newspaper extends Component{
  renderArticle(i){
    return <Article value={i} />;
  }
}

class Article extends React.Component {
  render() {
    return (
    //"<a href=" + "'https://en.wikipedia.org/wiki/" + data[1][i] + "' class='entry' id='" + i + "' target='_blank'>" + "<h3>" + data[1][i] + "</h3>" + "<br>" + data[2][i] + "</a>"
      <a className="entry" href={this.props.link} target="_blank">
        {this.props.title}
        {this.props.substitle}
      </a>
    );
  }
}

export default App;
