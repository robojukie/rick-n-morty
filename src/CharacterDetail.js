import { Link, useParams } from 'react-router-dom';

function CharacterDetail(props) {
  const { characters } = props; // TODO pass in exact character? fetch from URL?
  
  let { id } = useParams();
  let selected = characters.filter((c) => c.id === parseInt(id))[0]  // TODO do i need this as state?

  return (
    <div className='detail-page-container'>
      <div className='detail-page-top'>
          {selected && (
            <div className='character-profile-picture' style={{backgroundImage: `url(${selected.image})`}}></div>
          )}
          <div className='character-details'>
            <h1>
              {selected && selected.name}
            </h1>
            <div>Status: {selected && selected.status}</div>
            <div>Gender: {selected && selected.gender}</div>
            <div>Species: {selected && selected.species}</div>
            <div>Location: {selected && selected.location.name}</div>
          </div>
      </div>
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