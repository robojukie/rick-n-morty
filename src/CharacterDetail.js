import { Link, useParams } from 'react-router-dom';

function CharacterDetail(props) {
  const { characters } = props; // TODO pass in exact character? fetch from URL?
  
  let { id } = useParams();
  let selected = characters.filter((c) => c.id === parseInt(id))[0]

  return (
    <div className='detail-page-container'>
      {selected ? (<div className='detail-page-top'>
          <div className='character-profile-picture' style={{backgroundImage: `url(${selected.image})`}}></div>
          <div className='character-details'>
            <h1>
              {selected.name}
            </h1>
            <div>Status: {selected.status}</div>
            <div>Gender: {selected.gender}</div>
            <div>Species: {selected.species}</div>
            <div>Location: {selected.location.name}</div>
          </div>
      </div>) :
      <div>

      </div>
      }
      <div className='detail-page-bottom'>
        <Link
          to='/'
        >
          Return to list of characters
        </Link>
      </div>
    </div>
  )
}

export default CharacterDetail;