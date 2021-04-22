function Filter(props) {
  const { query, filterCharacters } = props;

  return (
    <input
      className='filter-characters'
      type='text'
      value={query}
      placeholder='Search characters'
      onChange={(e) => {
        filterCharacters(e.target.value)
      }}
    />
  )
}

export default Filter;