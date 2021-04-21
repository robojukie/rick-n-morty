import { Link, useParams } from 'react-router-dom';

function CharacterDetail(props) {
  const { characters } = props;
  
  /**
   * Getting ID from param instead of specific character through link
   * since user should be able to type in any id without depending on click action from list
   */
  let { id } = useParams();

  /** 
   * Alternatively, can make an API call with id - would handle cases of characters not returned on first page of API correctly
   * Filter doesn't rely on server to load data each time a new id is looked up, transition looks smoother
   */
  let selectedCharacter = characters.filter((c) => c.id === parseInt(id))[0]

  return (
    <div className='detail-page-container'>
      {selectedCharacter ? (
        <div className='detail-page-top'>
          <div className='character-profile-picture' style={{backgroundImage: `url(${selectedCharacter.image})`}}></div>
          <div className='character-details'>
            <h1>
              {selectedCharacter.name}
            </h1>
            <div>Status: {selectedCharacter.status}</div>
            <div>Gender: {selectedCharacter.gender}</div>
            <div>Species: {selectedCharacter.species}</div>
            <div>Location: {selectedCharacter.location.name}</div>
          </div>
        </div>
      ) :
        <div>
          {/* Need to modify if taking into consideration characters from other pages of the API */}
          <div className='detail-page-bad-id'>Sorry that character doesn't exist</div>
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