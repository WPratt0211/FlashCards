import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ location, singleDeck }) {
  const path = location.pathname.split("/").slice(2);

  function isLast(index) {
    return index === breadcrumbPath.length - 1;
  }
  const breadcrumbPath = [];
  path[0] === "new"
    ? (breadcrumbPath[0] = "Create Deck")
    : (breadcrumbPath[0] = singleDeck.name);

  if (path[1] === "edit") {
    breadcrumbPath[1] = "Edit Deck";
  } else if (path[1] === "study") {
    breadcrumbPath[1] = "Study";
  } else if (path[1] === "cards")
    if (path[2] === "new") {
      breadcrumbPath[1] = "Add Card";
    } else if (path[3] === "edit") {
      breadcrumbPath[1] = `Edit Card ${path[2]}`;
    }

  return (
    <nav className="row" aria-label="breadcrumb">
      <ol className="breadcrumb w-100 ">
        <li className="breadcrumb-item align-items-center">
          <Link to="/" className={`btn btn-link`}>
            <i className="bi bi-house-fill"></i> Home
          </Link>
        </li>
        {breadcrumbPath.map((crumb, ci) => {
          const disabled = isLast(ci) ? "disabled" : "";

          return (
            <li key={ci} className="breadcrumb-item align-items-center">
              <Link
                to={`/decks/${path[0]}`}
                className={`btn btn-link ${disabled}`}
              >
                {crumb}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
