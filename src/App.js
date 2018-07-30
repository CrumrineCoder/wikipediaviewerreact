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

  /*
  createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }
  */

  componentDidMount() {
    fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search=dog&limit=10&namespace=0&origin=*')
    .then(results => {
      return results.json();
    }).then(data =>{
      let articles = convertToJSON(data).map((article, i) =>{
        return (
            <h1 key={i}> {article.title} </h1>
        )
      })
      console.log(typeof articles);
      console.log(articles[0]);
     this.setState({magazine: articles});
     console.log("magazine", this.state.magazine);
    //  console.log(convertToJSON(data));
   /*   let table = [];

      for(let i=0; i<3; i++){
        let children = [];
        for(let j=0; j<5; j++){
          children.push(<td>{`Column ${j + 1}`}</td>)
        }
        table.push(<tr>{children}</tr>)
      }
      return table; */
  /*    console.log(data);
     data.map((article, i) => {
        console.log(article);
      })
      this.setState({ titles: data[1], descriptions: data[2], links: data[3] }) */
   /*   let articles = data.results.map((article, i) =>{
        return (
          <div key={i}>
            <img key={i} src={article.picture.medium} />
          </div>
        )
      })
      this.setState({ magazine: articles })
      console.log("magazine", this.state.magazine); */
    })
     // .then(({ results }) => ;
  }
  render() {
    return (
      //"<a href=" + "'https://en.wikipedia.org/wiki/" + data[1][i] + "' class='entry' id='" + i + "' target='_blank'>" + "<h3>" + data[1][i] + "</h3>" + "<br>" + data[2][i] + "</a>"
      <a className="entry" href={this.props.link} target="_blank">
        {this.state.magazine}
      </a>
    );
  }
  /*
  componentDidMount() {
    fetch("https://en.wikipedia.org/w/api.php?action=opensearch&search=dog&limit=10&namespace=0&format=json")
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
  } */
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
