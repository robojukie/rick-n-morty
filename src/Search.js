function Filter(props) {
  const { query, filterCharacters } = props;
  
  return (
    <div className='search'>
      <input
        className='filter-characters'
        type='text'
        value={query.name || ''}
        placeholder='Search characters by name, status, gender, or species'
        onChange={filterCharacters}
      />
    </div>
  )
}

export default Filter;