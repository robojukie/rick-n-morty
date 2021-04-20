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
              status={character.status}
              gender={character.gender}
              species={character.species}
              url={character.url}
            />
          )
        })
      }
    </ul>
  )
}

export default CharacterList;