import PropTypes from 'prop-types';
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
          const isFavorite = favorites[character.id] === true;

          return (
            <div key={character.id}
              className={isFavorite ? 'favorite' : undefined}
            >
              <div 
                onClick={() => toggleFavorite(character.id)}
              >
                +
              </div>
              <CharacterItem
                className={isFavorite ? 'favorite' : undefined}
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
  favorites: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default CharacterList;