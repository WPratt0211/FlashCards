import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

const DeckList = ({ setDecks, decks }) => {
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listDecks(signal)
      .then(setDecks)
      .catch((error) => console.log(error));

    return () => abortController.abort();
  }, [setDecks]);
  const handleDelete = (id) => {
    let result = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );
    if (result) deleteDeck(id).then(history.go(0));
  };

  const decksListed = () => {
    if (decks) {
      return decks.map((deck) => {
        const cardsList = [...deck.cards];
        return (
          <div className="card mb-1" key={deck.id} id={deck.id}>
            <div className="card-body">
              <h5 className="d-inline-block card-title">{deck.name}</h5>
              <h6 className="d-inline-block card-subtitle text-muted float-right margin-top">
                {cardsList.length} cards
              </h6>

              <p className="card-text">{deck.description}</p>

              <Link to={`decks/${deck.id}`} className="btn btn-secondary mr-2">
                <i className="bi bi-eye"></i> View
              </Link>
              <Link
                to={`decks/${deck.id}/study`}
                className="btn btn-primary mr-2"
              >
                <i className="bi bi-book"></i> Study
              </Link>
              <button
                className="btn btn-danger float-right margin-bottom"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(deck.id);
                }}
              >
                <i className="bi bi-x-square"></i> Delete
              </button>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <Link
        to="/decks/new"
        className="btn btn-secondary btn-lg mb-2
      "
      >
        <i className="bi bi-plus-square"></i> Create Deck
      </Link>
      {decksListed()}
    </div>
  );
};

export default DeckList;
