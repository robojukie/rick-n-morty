import { useEffect, useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import Filter from './Filter';
import { Route, Switch } from 'react-router-dom';

import './App.css';

function App() {
  const baseUrl = 'https://rickandmortyapi.com/api/character/';

  const [ characters, setCharacters ] = useState([]);
  // use to display characters without modifying original list of characters
  const [ filteredCharacters, setFilteredCharacters ] = useState([]);
  const [ query, setQuery ] = useState('');

  // fetching base url returns 20 of 600+ characters from paginated API
  useEffect(() => {
    async function fetchCharacters() {
      await fetch(baseUrl, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((resJSON) => {
        setCharacters([...resJSON.results])
        setFilteredCharacters([...resJSON.results])
      })
      .catch(error => console.error('Error', error))
    }
    fetchCharacters()
  }, [baseUrl])

  const filterCharacters = (updatedQuery) => {
    setQuery(updatedQuery);

    let filtered = characters.filter((c) => {
      return c.name.toLowerCase().includes(updatedQuery.trim().toLowerCase()) ||
      c.status.toLowerCase() === updatedQuery.trim().toLowerCase() ||
      c.gender.toLowerCase() === updatedQuery.trim().toLowerCase() ||
      c.species.toLowerCase() === updatedQuery.trim().toLowerCase()
    })
    setFilteredCharacters(filtered)
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Switch>
        <Route
          exact path='/'
          render={() => (
            <div className='list-page-container'>
              <div className='list-page-container-top'>
                <h1>Characters</h1>
                <h3>Select a character for more details</h3>
                <div className='filter-container'>
                  <Filter
                    query={query}
                    filterCharacters={filterCharacters}
                  />
                </div>
                <p>Showing {filteredCharacters.length} Characters</p>
              </div>
              <div className='list-container'>
                <CharacterList
                  characters={filteredCharacters}
                  query={query}
                />
              </div>
            </div>
          )}
        />
        <Route
          path='/character/:id'
          render={() => (
            <CharacterDetail
              characters={characters}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
