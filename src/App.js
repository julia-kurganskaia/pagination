import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { makeApage } from "./pag/pagination";

function App() {

  const [ currentPage, setCurrentPage ] = useState(1);
  const page = makeApage(currentPage);
  const pagesNumber = Math.ceil(page.totalItemsNumber / page.itemsPerPage);

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
          {page.itemsToShow.map((item) => {
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
