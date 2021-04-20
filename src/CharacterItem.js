import { Link } from 'react-router-dom';

function CharacterItem(props) {
  const { id, name, status, gender, species, image } = props;
  
  return (
    <li className='character-item'>
      <Link
        to={`/character/${id}`}
      >
        <div className='character-thumbnail' style={{backgroundImage: `url(${image})`}}></div>
        <div className='character-summary'>{name}</div>
      </Link>
    </li>
  )
}

export default CharacterItem;