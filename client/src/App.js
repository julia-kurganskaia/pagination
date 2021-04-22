//@ts-check

import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalItemsNumber, setTotalItemsNumber ] = useState(0);
  const [ itemsPerPage, setItemsPerPage ] = useState(1);
  const [ itemsToShow, setItemsToShow ] = useState([]);
  const [ showThrobber, setShowThrobber ] = useState(false);

  const pagesNumber = Math.ceil(totalItemsNumber / itemsPerPage);

  useEffect(() => {
    setShowThrobber(true);

    fetch(`/api/v1/something?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setTotalItemsNumber(data.totalItemsNumber);
        setItemsPerPage(data.itemsPerPage);
        setItemsToShow(data.itemsToShow);
        setShowThrobber(false);
      });
  }, [currentPage]);

  let pages = [];

  for (let i = 1; i <= pagesNumber; i++) {
    pages.push(i);
  }

  function handleClick(e) {
    e.preventDefault();

    setCurrentPage(Number(e.target.dataset.page));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>The 100 Most Iconic Book Quotes</h1>
        <div className="fa-3x">
          {showThrobber === true ? <i className="fas fa-spinner fa-pulse"></i> : null}
        </div>
        <div className="ItemsToDisplay">
          {showThrobber === false ? itemsToShow.map((item) => {
            return (
              <div key={item} className="Item">{item}</div>
            )
          }) : null}
        </div>
        <div className="Pages-container">
          {pages.map((page) => {
            return (
              <a href="/" className={`Pagination${page === currentPage ? " Active" : ""}`} key={page} data-page={page} onClick={handleClick}>{page}</a>
            )})
          }
        </div>

        <a href="https://www.bookbub.com/blog/famous-book-quotes" className="Source">Source</a>

      </header>
    </div>
  );
};

export default App;
