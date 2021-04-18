import { useEffect, useState } from 'react';
import CharacterList from './CharacterList';
import './App.css';

const url = 'https://rickandmortyapi.com/api/character'
function App() {
  
  const [ characters, setCharacters ] = useState([]);

  async function fetchCharacters() {
    await fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((resJSON) => {
      setCharacters(resJSON.results)
    })
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <Filter></Filter> */}
      <CharacterList characters={characters}></CharacterList>
    </div>
  );
}

export default App;
