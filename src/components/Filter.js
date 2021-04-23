const genderFilters = [
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
function Filter(props) {
  const { query, filterCharacters } = props;
  
  return (
      <div className='gender'>  
        <h5 style={{marginBottom: `5px`}}>Gender</h5>
        {genderFilters.map((filt) => {
          return (
            <div className='filter-checkbox-input' key={filt.key}>
              <label htmlFor={filt.name}>
                {filt.label}
                <input
                  type='checkbox'
                  name={filt.name}
                  checked={(query && query[filt.name]) || false}
                  onChange={filterCharacters}
                />
              </label>
            </div>
          )
        })}
      </div>
  )
}

export default Filter;