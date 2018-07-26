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
        <RandomArticles />
        <Article />
      </div>
    );
  }
}

class Newspaper extends Component {
  renderArticle(i) {
    return <Article value={i} />;
  }
}

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      magazine: []
    };
  }
  render() {
    return (
      //"<a href=" + "'https://en.wikipedia.org/wiki/" + data[1][i] + "' class='entry' id='" + i + "' target='_blank'>" + "<h3>" + data[1][i] + "</h3>" + "<br>" + data[2][i] + "</a>"
      <a className="entry" href={this.props.link} target="_blank">
        {this.state.magazine}
      </a>
    );
  }
  componentDidMount() {
    fetch("https://en.wikipedia.org/w/api.php?action=opensearch&search=dog&limit=10&namespace=0&format=json", { mode: "no-cors",  headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(results => {
        return results.json();
      }).then(data => {
        let articles = data.results.map((article) => {
          return (
            <div key={data[0]}>
              <h3>{data[0][0]}</h3>
            </div>
          )
        })
        this.setState({ magazine: articles });
        console.log("articles", this.state.magazine);
      })
  }
}



class RandomArticles extends React.Component {
  render() {
    return (
      <button className="randomArticles" onClick={() => alert('click')}>
        Get Random Articles
      </button>
    );
  }
}

export default App;
