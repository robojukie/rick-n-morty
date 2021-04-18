import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const url = 'https://rickandmortyapi.com/api/character'
function App() {
  
  const [ characters, setCharacters ] = useState({});

  async function fetchCharacters() {
    await fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((resJSON) => setCharacters(resJSON))
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
