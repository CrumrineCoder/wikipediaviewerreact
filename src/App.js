import React, { Component } from 'react';
import './App.css';
import Article from "./Article"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Article />
      </div>
    );
  }
}
/*
function APIDATA(props) {
  if (props.magazine.length > 0) {
    document.getElementsByClassName("entry")[0].style.marginTop = "50px";
    return props.magazine;
  }
  else if (props.query.length > 0 && props.magazine.length === 0) {
    document.getElementsByClassName("entry")[0].style.marginTop = "50px";
    return <h3> There are no results for this search query. </h3>
  }
  else {
    if(document.getElementsByClassName("entry")[0]){
      document.getElementsByClassName("entry")[0].style.marginTop = "200px"
    }
    return <h3>Type in the search bar above to search for Wikipedia Articles.</h3>
  }
}

function convertToJSONQuery(array) {
  var objArray = [];
  var key = ["title", "description", "link"];
  for (var i = 1; i <= array[1].length; i++) {
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
      this.fetchData();
    })
  }

  clear = () => {
    this.setState({ magazine: {}, query: "" });
  }

  fetchRandomData = () => {
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10&origin=*')
      .then(results => {
        return results.json();
      }).then(data => {
        let articles = convertToJSONRandom(data.query.random).map((article, i) => {
          return (
            <a className="article" key={i} target="_blank" href={article.link}>
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
              <a className="article" key={i} target="_blank" href={article.link}>
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
        <div className="searchContainer">
          <input
            placeholder="Search for any Wikipedia Article"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            value={this.state.query}
          /><button className="clear" onClick={this.clear}>  <i className="fa fa-times"> </i> </button>
         
        </div>
        <h3>- or -</h3>
        <button onClick={this.fetchRandomData}> Get Random Wikipedia Articles </button>
        <APIDATA magazine={this.state.magazine} query={this.state.query} />
      </div>
    );
  }
}
*/
export default App;
