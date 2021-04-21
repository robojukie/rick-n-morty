import CharacterItem from './CharacterItem';

function CharacterList(props) {
  const { characters } = props;

  return (
    <ul className='character-list'>
      {
        characters.map((character) => {
          return (
            <CharacterItem
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
            />
          )
        })
      }
    </ul>
  )
}

export default CharacterList;