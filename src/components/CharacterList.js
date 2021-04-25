import PropTypes from 'prop-types'; // ES6
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
          console.log({favorites})
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

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired

}

export default CharacterList;