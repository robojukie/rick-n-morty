import { useEffect, useState } from "react";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Filter, {
  genderFilters,
  statusFilters,
  speciesFilters,
} from "./components/Filter";
import Search from "./components/Search";
import { Link, Route, Switch } from "react-router-dom";

import "./App.css";
import Favorites from "./components/Favorites";

function App() {
  const baseUrl = "https://rickandmortyapi.com/api/character/";
  const [characters, setCharacters] = useState([]);
  // use to display characters without modifying original list of characters
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [query, setQuery] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // fetching base url returns 20 of 600+ characters from paginated API
  useEffect(() => {
    /**
     * Fetches characters from API
     */
    async function fetchCharacters() {
      await fetch(baseUrl, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((resJSON) => {
          let results = [...resJSON.results];
          setCharacters([...results]);
          setFilteredCharacters([...results]);

          setIsLoaded(true);
        })
        .catch((error) => console.error("Error", error));
    }
    fetchCharacters();
  }, []);

  /**
   * Filter characters when query changes
   */
  useEffect(() => {
    // check for all filter values to not be true
    const returnAllValues = (filterType) => {
      for (const item of filterType) {
        if (query[item.name] === true) {
          return false;
        }
      }
      return true;
    };
    // if all boxes are unchecked, return true so all characters are returned after filter
    const returnAllGenders = query ? returnAllValues(genderFilters) : true;
    const returnAllStatus = query ? returnAllValues(statusFilters) : true;
    const returnAllSpecies = query ? returnAllValues(speciesFilters) : true;

    const filterCharacters = () => {
      let filtered;
      if (query) {
        filtered = characters.filter((c) => {
          const name = c.name.toLowerCase();
          const gender = c.gender.toLowerCase();
          // query stores all filter types by name, so need to differentiate when query.name = 'unknown' by type (i.e. 'unknownStatus'). query.unknown defaults to unknown gender value
          const status =
            c.status.toLowerCase() === "unknown"
              ? c.status.toLowerCase() + "Status"
              : c.status.toLowerCase();
          const species =
            c.species.toLowerCase() === "unknown"
              ? c.species.toLowerCase() + "Species"
              : c.species.toLowerCase();

          const nameMatched = name.includes(
            query.name && query.name.trim().toLowerCase()
          );
          const genderMatched = query[gender] === true;
          const statusMatched = query[status] === true;
          const speciesMatched = query[species] === true;

          if (
            (returnAllGenders || genderMatched) &&
            (returnAllStatus || statusMatched) &&
            (returnAllSpecies || speciesMatched)
          ) {
            if (!query.name || nameMatched) {
              return true;
            }
          }
          return false;
        });
      }
      setFilteredCharacters(filtered);
    };
    filterCharacters(query);
  }, [query]);

  // handling favorites
  useEffect(() => {
    console.log("how often do i run");
    setFavorites(JSON.parse(window.localStorage.getItem("favorites")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((favs) => ({
      ...favorites,
      [id]: favs ? !favs[id] : true,
    }));
  }

  /**
   * Sets query with updated values
   * @param { event } e Event interface
   */
  const handleQueryChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.type === "text") {
      setQuery((query) => ({
        ...query,
        name: value,
      }));
    } else {
      setQuery((query) => ({
        ...query,
        [e.target.name]: value,
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            // break this out into component
            <div className="list-page-container">
              <div className="list-page-container-top">
                <h1>Characters</h1>
                <h3>Select a character for more details</h3>
                <p>Showing {filteredCharacters.length} Characters</p>
                <Link to={`/characters/favorites`}>
                  <button>View Favorites</button>
                </Link>
                <Search query={query} filterCharacters={handleQueryChange} />
              </div>
              <div className="list-page-container-bottom">
                <div className="filter-container">
                  <Filter query={query} filterCharacters={handleQueryChange} />
                </div>
                <div className="list-container">
                  <CharacterList
                    characters={filteredCharacters}
                    query={query}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              </div>
            </div>
          )}
        />
        <Route
          path="/character/:id"
          render={() =>
            isLoaded && (
              <CharacterDetail characters={characters} favorites={favorites} />
            )
          }
        />
        <Route
          path="/characters/favorites"
          render={() => (
            isLoaded && <Favorites
              characters={characters}
              favorites={favorites}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
