//@ts-check

import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalItemsNumber, setTotalItemsNumber ] = useState(0);
  const [ itemsPerPage, setItemsPerPage ] = useState(1);
  const [ itemsToShow, setItemsToShow ] = useState([]);

  const pagesNumber = Math.ceil(totalItemsNumber / itemsPerPage);

  useEffect(() => {
    fetch(`/api/v1/something?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setTotalItemsNumber(data.totalItemsNumber);
        setItemsPerPage(data.itemsPerPage);
        setItemsToShow(data.itemsToShow);
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
        <div className="ItemsToDisplay">
          {itemsToShow.map((item) => {
            return (
              <div key={item} className="Item">{item}</div>
            )
          })}
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
