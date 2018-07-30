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

function convertToJSON(array) {
  var objArray = [];
  var key = ["title", "description", "link"]
  console.log(array);
  for (var i = 1; i <= array[1].length; i++) {
    objArray[i - 1] = {};
    for (var k = 1; k <=3 ; k++) {;
      objArray[i-1][key[k-1]] = array[k][i-1]
    }
  }

  return objArray;
}

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      magazine: []
    };
  }

  componentDidMount() {
    fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search=dog&limit=10&namespace=0&origin=*')
    .then(results => {
      return results.json();
    }).then(data =>{
      let articles = convertToJSON(data).map((article, i) =>{
        return (
          <a key={i} target="_blank" href={article.link}>
            <h3> {article.title} </h3>
            <p> {article.description} </p>
          </a>
        )
      })
     this.setState({magazine: articles});
    })
  }
  render() {
    return (
      //"<a href=" + "'https://en.wikipedia.org/wiki/" + data[1][i] + "' class='entry' id='" + i + "' target='_blank'>" + "<h3>" + data[1][i] + "</h3>" + "<br>" + data[2][i] + "</a>"
      <div className="entry">
        {this.state.magazine}
      </div>
    );
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
