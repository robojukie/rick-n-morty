import { useEffect, useState } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import Filter from './components/Filter';
import Search from './components/Search';
import { Route, Switch } from 'react-router-dom';

import './App.css';

function App() {
  const baseUrl = 'https://rickandmortyapi.com/api/character/';
  const [ characters, setCharacters ] = useState([]);
  // use to display characters without modifying original list of characters
  const [ filteredCharacters, setFilteredCharacters ] = useState([]);
  const [ query, setQuery ] = useState({});

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

  /**
   * Filter characters when query changes
   */

  useEffect(() =>{
    /**
     * if (name empty and all unchecked) -> return all characters
     * else filter by name and gender
     */
    const filterCharacters = () => {
      let filtered;
      let areAllUnchecked = true;
      if (query) {
        // check for all filter values to not be true
        for ( const [key, val] of Object.entries(query)) {
          if (val === true) {
            areAllUnchecked =  false;
            break;
          }
        }

        filtered = characters.filter((c) => {
          const nameMatched = c.name.toLowerCase().includes(query.name && query.name.trim().toLowerCase())
          const genderMatched = query[c.gender.toLowerCase()] === true;
          return (nameMatched && genderMatched) 
            || (nameMatched && areAllUnchecked) // for inital app load when all unchecked
            || (!query.name && areAllUnchecked) // absence of query.name and all unchecked after intially checked
            || (!query.name && genderMatched) // handles initial absence of query.name
        })
      }
      
      setFilteredCharacters(filtered)
    }
    filterCharacters(query)
  }, [query])

  const handleQueryChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    if (e.target.type === 'text') {
      setQuery((query) => ({
        ...query,
        'name': value
      }))
    } else {
      setQuery((query) => ({
        ...query,
        [e.target.name]: value
      }))
    }
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
                <p>Showing {filteredCharacters.length} Characters</p>
                <Search
                  query={query}
                  filterCharacters={handleQueryChange}
                />
              </div>
              <div className='list-page-container-bottom'>
                <div className='filter-container'>
                  <Filter
                    query={query}
                    filterCharacters={handleQueryChange}
                  />
                </div>
                <div className='list-container'>
                  <CharacterList
                    characters={filteredCharacters}
                    query={query}
                  />
                </div>
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
