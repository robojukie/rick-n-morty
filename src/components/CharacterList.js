import { buildQueries } from '@testing-library/dom';
import CharacterItem from './CharacterItem';

/**
 * Renders filtered list of characters
 */
function CharacterList(props) {
  const { characters, favorites, toggleFavorite } = props;

  return (
    <ul className='character-list'>
      {
        characters.length > 0 ? characters.map((character) => {
          // if character.id === true, add class favorite, else don't add class favorite
          const isFavorite = favorites[character.id] === true;

          return (
            <div key={character.id}
              className={isFavorite && 'favorite'}
            >
              <div 
                onClick={() => toggleFavorite(character.id)}
              >
                +
              </div>
              <CharacterItem
                className={isFavorite && 'favorite'}
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                isFavorite={isFavorite}
              />
            </div>
          )
        }) : <div>No characters found!</div>
      }
    </ul>
  )
}

export default CharacterList;