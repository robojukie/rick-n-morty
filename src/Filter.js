function Filter(props) {
  const { query, filterCharacters } = props;

  return (
    <input
      type='text'
      value={query}
      placeholder='Search for characters'
      onChange={(e) => {
        filterCharacters(e.target.value)
      }}
    />
  )


}

export default Filter;