import { Link } from 'react-router-dom';

function CharacterItem(props) {
  const { id, name, status, gender, species, image } = props;
  
  return (
    <Link
      to={`/character/${id}`}
    >
      <img src={image} alt='character profile' />
      <div>{name}</div>
      <div>{status}</div>
    </Link>
  )
}

export default CharacterItem;