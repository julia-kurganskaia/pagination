//@ts-check

import logo from "./logo.svg";
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
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Pagination</h1>
        <div className="ItemsToDisplay">
          {itemsToShow.map((item) => {
            return (
              <div key={item} className="Item">{item}</div>
            )
          })}
        </div>
        <div>
          {pages.map((page) => {
            return (
              <a href="/" className={`Pagination${page === currentPage ? " Active" : ""}`} key={page} data-page={page} onClick={handleClick}>{page}</a>
            )})
          }
        </div>
      </header>
    </div>
  );
};

export default App;
