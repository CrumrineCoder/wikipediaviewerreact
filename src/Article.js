import React, { useState, useEffect } from "react";

const useForm = (callback) => {
  const [inputs, setInputs] = useState({ query: "" });

  const clearQuery = () => {
    setInputs({ query: "" });
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return {
    clearQuery,
    handleInputChange,
    inputs,
  };
};
function Article() {
  // Declare a new state variable, which we'll call "count"
  const [magazine, setMagazine] = useState([]);
  const { inputs, handleInputChange, clearQuery } = useForm();

  useEffect(() => {
    fetchData(inputs.query);
  }, [inputs.query]);

  function APIDATA(props) {
    if (props.magazine.length > 0) {
      document.getElementsByClassName("entry")[0].style.marginTop = "50px";
      return props.magazine;
    } else if (props.query.length > 0 && props.magazine.length === 0) {
      document.getElementsByClassName("entry")[0].style.marginTop = "50px";
      return <h3> There are no results for this search query. </h3>;
    } else {
      if (document.getElementsByClassName("entry")[0]) {
        document.getElementsByClassName("entry")[0].style.marginTop = "200px";
      }
      return (
        <h3>Type in the search bar above to search for Wikipedia Articles.</h3>
      );
    }
  }

  function fetchData(searchValue) {
    if (searchValue) {
      fetch(
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
          searchValue +
          "&limit=10&namespace=0&origin=*"
      )
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          let articles = convertToJSONQuery(data).map((article, i) => {
            return (
              <a
                className="article"
                rel="noopener noreferrer"
                key={i}
                target="_blank"
                href={article.link}
              >
                <h3> {article.title} </h3>
                <p> {article.description} </p>
              </a>
            );
          });
          setMagazine(articles);
        });
    } else {
      setMagazine("");
    }
  }

  function fetchRandomData() {
    fetch(
      "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10&origin=*"
    )
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let articles = convertToJSONRandom(data.query.random).map(
          (article, i) => {
            return (
              <a
                className="article"
                rel="noopener noreferrer"
                key={i}
                target="_blank"
                href={article.link}
              >
                <h3> {article.title} </h3>
              </a>
            );
          }
        );
        setMagazine(articles);
      });
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

  return (
    <div className="entry">
      <div className="searchContainer">
        <input
          placeholder="Search for any Wikipedia Article"
          value={inputs.query}
          onInput={handleInputChange}
          name="query"
        />
        <button
          className="clear"
          onClick={function () {
            clearQuery();
            setMagazine([]);
          }}
        >
          {" "}
          <i className="fa fa-times"> </i>{" "}
        </button>
      </div>
      <h3>- or -</h3>
      <button onClick={fetchRandomData}> Get Random Wikipedia Articles </button>
      <div className="WikipediaResultsContainer">
        <APIDATA magazine={magazine} query={inputs.query} />
      </div>
    </div>
  );
}

export default Article;
