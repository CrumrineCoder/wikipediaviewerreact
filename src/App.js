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

function APIDATA (props) {
  if(props.query.length > 0){
   if(props.magazine.length > 0){
     return props.magazine;
   } else{
     return <p> There are no results for this search query. </p>
   }
  }
  else if(props.query.length === 0){
    return <p>Type in the search bar above to search for Wikipedia Articles.</p>
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
    } else {
      this.setState({ magazine: "" });
    }
  }

  render() {
    return (
      <div className="entry">
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
      <APIDATA magazine={this.state.magazine} query={this.state.query}/>
      </div>
    );
  }
}




export default App;
