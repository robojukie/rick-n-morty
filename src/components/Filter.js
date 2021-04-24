export const genderFilters = [
  {
    name: 'female',
    key: 'gender1',
    label: 'Female',
    fType: 'gender'
  },
  {
    name: 'male',
    key: 'gender2',
    label: 'Male',
    fType: 'gender'
  },
  {
    name: 'genderless',
    key: 'gender3',
    label: 'Genderless',
    fType: 'gender'
  },
  {
    name: 'unknown',
    key: 'gender4',
    label: 'Unknown',
    fType: 'gender'
  }
]

export const statusFilters = [
  {
    name: 'alive',
    key: 'status1',
    label: 'Alive',
    fType: 'status'
  },
  {
    name: 'dead',
    key: 'status2',
    label: 'Dead',
    fType: 'status'
  },

  {
    name: 'unknownStatus',
    key: 'status3',
    label: 'Unknown',
    fType: 'status'
  }
]

export const speciesFilters = [
  {
    name: 'human',
    key: 'species1',
    label: 'Human',
    fType: 'species'
  },
  {
    name: 'alien',
    key: 'species2',
    label: 'Alien',
    fType: 'species'
  },

  {
    name: 'unknownSpecies',
    key: 'species3',
    label: 'Unknown',
    fType: 'species'
  }
]

/**
 * Filters by gender
 * @param { object } query Query options
 * @param { function } filterCharacters Function to filter characters
 * @returns list of gender checkboxes
 */
function Filter(props) {
  const { query, filterCharacters } = props;
  
  return (
    <div className='checkbox filters'>

      <div className='gender'>  
        <h5 style={{marginBottom: `5px`}}>Gender</h5>
        {genderFilters.map((filt) => {
          return (
            <div className='filter-checkbox-input' key={filt.key}>
              <label htmlFor={filt.name}>
                <input
                  type='checkbox'
                  name={filt.name}
                  checked={(query && query[filt.name]) || false}
                  onChange={filterCharacters}
                />
                {filt.label}
              </label>
            </div>
          )
        })}
      </div>
      <div className='status'>  
        <h5 style={{marginBottom: `5px`}}>Status</h5>
        {statusFilters.map((filt) => {
          return (
            <div className='filter-checkbox-input' key={filt.key}>
              <label htmlFor={filt.name}>
                <input
                  type='checkbox'
                  name={filt.name}
                  checked={(query && query[filt.name]) || false} // unknown
                  onChange={filterCharacters}
                />
                {filt.label}
              </label>
            </div>
          )
        })}
      </div>
      <div className='species'>  
        <h5 style={{marginBottom: `5px`}}>Species</h5>
        {speciesFilters.map((filt) => {
          return (
            <div className='filter-checkbox-input' key={filt.key}>
              <label htmlFor={filt.name}>
                <input
                  type='checkbox'
                  name={filt.name}
                  checked={(query && query[filt.name]) || false}
                  onChange={filterCharacters}
                />
                {filt.label}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Filter;