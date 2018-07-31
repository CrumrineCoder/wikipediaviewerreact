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
  for (var i = 1; i <= array[1].length; i++) {
    objArray[i - 1] = {};
    for (var k = 1; k <= 3; k++) {
      objArray[i - 1][key[k - 1]] = array[k][i - 1];
    }
  }
  return objArray;
}

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      magazine: [],
      query: ''
    };
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      console.log("Test");
      //   if (this.state.query && this.state.query.length > 1) {
      this.fetchData();
      //}
    })
  }


  fetchData = () => {
    if (this.state.query) {
      fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.state.query + '&limit=10&namespace=0&origin=*')
        .then(results => {
          return results.json();
        }).then(data => {
          console.log("Before: ", this.state.query);
          let articles = convertToJSON(data).map((article, i) => {
            return (
              <a key={i} target="_blank" href={article.link}>
                <h3> {article.title} </h3>
                <p> {article.description} </p>
              </a>
            )
          })
          this.setState({ magazine: articles });
          console.log("After: ", this.state.query);
        })
    } else{
      this.setState({ magazine: "" });
    }
  }

  render() {
    var length = this.state.magazine.length;
    console.log(length);
    return (
      //"<a href=" + "'https://en.wikipedia.org/wiki/" + data[1][i] + "' class='entry' id='" + i + "' target='_blank'>" + "<h3>" + data[1][i] + "</h3>" + "<br>" + data[2][i] + "</a>"
      //<Suggestions results={this.state.results} />
      /*   <button className="randomArticles" onClick={this.fetchData}>
             Get Random Articles
           </button>
      */
      <div className="entry">
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        {this.state.magazine}
      </div>
    );
  }
}

export default App;
