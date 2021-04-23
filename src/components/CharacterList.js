import CharacterItem from './CharacterItem';

/**
 * Renders filtered list of characters
 */
function CharacterList(props) {
  const { characters } = props;

  return (
    <ul className='character-list'>
      {
        characters.length > 0 ? characters.map((character) => {
          return (
            <CharacterItem
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
            />
          )
        }) : <div>No characters found!</div>
      }
    </ul>
  )
}

export default CharacterList;