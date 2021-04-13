import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const pages = [1, 2, 3, 4, 5, 6];

function App() {
  const [ currentPage, setCurrentPage ] = useState(1);
  function handleClick(e) {
    e.preventDefault();

    setCurrentPage(Number(e.target.dataset.page));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Pagination</h1>
        <div>
          {pages.map((page) => {
            // console.log(index)
            return (
              <a href="/" className={`Pagination${page === currentPage ? " Active" : ""}`} key={page} data-page={page} onClick={handleClick}>{page}</a>
            )})
          }
        </div>
      </header>
    </div>
  );
}

export default App;
