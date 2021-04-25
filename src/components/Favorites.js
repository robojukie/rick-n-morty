import { Link } from "react-router-dom";

function Favorites({ characters, favorites }) {
  return (
    <div>
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
