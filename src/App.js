import { useEffect, useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import { Route } from 'react-router-dom';

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
      <Route
        exact path='/'
        render={() => (
          <div className='list-page-container'>
            <div className='list-page-container-top'>
              <h1>Characters</h1>
              <h3>Select a character for more details</h3>
              {/* <Filter></Filter> */}
            </div>
            <div className='list-container'>
              <CharacterList
                characters={characters}
              />
            </div>
          </div>
        )}
      />
      <Route
        path='/character/:id'
        render={() => (
          <CharacterDetail characters={characters}/>
        )}
      />
    </div>
  );
}

export default App;
