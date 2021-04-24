import { useEffect, useState } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import Filter, { genderFilters, statusFilters, speciesFilters } from './components/Filter';
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
    /**
     * Fetches characters from API
     */
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
    // check for all filter values to not be true
    const returnAllValues = (filterType) => {
      for (const item of filterType) {
        if (query[item.name] === true) {
          return false
        }
      }
      return true
    }
    // if all boxes are unchecked, return true so all characters are returned after filter
    const returnAllGenders = query ? returnAllValues(genderFilters) : true
    const returnAllStatus = query ? returnAllValues(statusFilters) : true
    const returnAllSpecies = query ? returnAllValues(speciesFilters) : true

    const filterCharacters = () => {
      let filtered;
      if (query) {
        filtered = characters.filter((c) => {
          const name = c.name.toLowerCase()
          const gender = c.gender.toLowerCase()
          // query stores all filter types by name, so need to differentiate when query.name = 'unknown' by type (i.e. 'unknownStatus'). query.unknown defaults to unknown gender value
          const status = c.status.toLowerCase() === 'unknown' ? c.status.toLowerCase() + 'Status' : c.status.toLowerCase()
          const species = c.species.toLowerCase() === 'unknown' ? c.species.toLowerCase() + 'Species' : c.species.toLowerCase()

          const nameMatched = name.includes(query.name.trim().toLowerCase())
          const genderMatched = query[gender] === true
          const statusMatched = query[status] === true
          const speciesMatched = query[species] === true

          if ((returnAllGenders || genderMatched) && (returnAllStatus || statusMatched) && (returnAllSpecies || speciesMatched)) {
            if (!query.name || nameMatched) {
              return true
            }
          }
          return false
        })
      }     
      setFilteredCharacters(filtered)
    }
    filterCharacters(query)
  }, [query])

  /**
   * Sets query with updated values
   * @param { event } e Event interface
   */
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
            // break this out into component
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
