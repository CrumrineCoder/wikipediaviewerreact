import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
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

function APIDATA(props) {
  if (props.magazine.length > 0) {
    return props.magazine;
  }
  else if (props.query.length > 0) {
    <p> There are no results for this search query. </p>
  }
  else if (props.query.length === 0) {
    return <p>Type in the search bar above to search for Wikipedia Articles.</p>
  }
}

function convertToJSONQuery(array) {
  var objArray = [];
  var key = ["title", "description", "link"];
  for (var i = 1; i <= array.length; i++) {
    objArray[i - 1] = {};
    for (var k = 1; k <= 3; k++) {
      objArray[i - 1][key[k - 1]] = array[k][i - 1];
    }
  }
  return objArray;
}

function convertToJSONRandom(array) {
  var objArray = [];
  var key = "title";
  for (var i = 0; i <= array.length - 1; i++) {
    objArray[i] = {};
    objArray[i][key] = array[i].title;
    objArray[i]["link"] = "https://en.wikipedia.org/wiki/" + array[i].title;
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
      //   if (this.state.query && this.state.query.length > 1) {
      this.fetchData();
      //}
    })
  }

  fetchRandomData = () => {
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10&origin=*')
      .then(results => {
        return results.json();
      }).then(data => {
        let articles = convertToJSONRandom(data.query.random).map((article, i) => {
          return (
            <a key={i} target="_blank" href={article.link}>
              <h3> {article.title} </h3>
            </a>
          )
        })
        this.setState({ magazine: articles });
      })
  }


  fetchData = () => {
    if (this.state.query) {
      fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.state.query + '&limit=10&namespace=0&origin=*')
        .then(results => {
          return results.json();
        }).then(data => {
          let articles = convertToJSONQuery(data).map((article, i) => {
            return (
              <a key={i} target="_blank" href={article.link}>
                <h3> {article.title} </h3>
                <p> {article.description} </p>
              </a>
            )
          })
          this.setState({ magazine: articles });
        })
    } else {
      this.setState({ magazine: "" });
    }
  }

  render() {
    return (
      <div className="entry">
        <button onClick={this.fetchRandomData}> Get Random Articles </button>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <APIDATA magazine={this.state.magazine} query={this.state.query} />
      </div>
    );
  }
}




export default App;
