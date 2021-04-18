function CharacterItem(props) {
  const { id, name, status, gender, species, image } = props;
  return (
    <div>
      <div>{name}</div>
      <div>{status}</div>
    </div>
  )
}

export default CharacterItem;