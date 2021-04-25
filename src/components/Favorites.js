import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites({ characters, favorites }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const numOfFavorites = Object.entries(favorites).filter((favorite) => {
      return favorite[1] === true;
    }).length
    setCount(numOfFavorites)
  },[favorites])

  return (
    <div>
      Showing {count} favorites
      {characters.map((c) => {
        if (favorites[c.id]) {
          return <li key={c.id}>{c.name}</li>;
        }
      })}
      <div className="detail-page-bottom">
        <Link to="/">Return to list of characters</Link>
      </div>
    </div>
  );
}

export default Favorites;
