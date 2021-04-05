import React, { useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api";

function Deck({ cards, setCards, singleDeck, setSingleDeck }) {
  const history = useHistory();
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId)
      .then(setSingleDeck)
      .catch((error) => console.log(error));

    return abortController.abort();
  }, [deckId, setSingleDeck]);

  useEffect(() => {
    const abortController = new AbortController();

    if (singleDeck.cards) {
      setCards(singleDeck.cards);
    }
    return abortController.abort();
  }, [deckId, setCards, singleDeck]);
  const handleDelete = (id, card) => {
    if (card) {
      let result = window.confirm(
        "Delete this card? \n \n You will not be able to recover it."
      );
      if (result) deleteCard(id).then(history.go(0));
    } else {
      let result = window.confirm(
        "Delete this deck? \n \n You will not be able to recover it."
      );
      if (result) deleteDeck(id).then(history.push("/"));
    }
  };

  const cardsListed = () => {
    if (cards) {
      return cards.map((card) => {
        return (
          <div className="card" key={card.id}>
            <div className="card-body">
              <div className="row">
                <p className="card-text col">{card.front}</p>
                <p className="card-text col">{card.back}</p>
              </div>
              <div className="row justify-content-end">
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-secondary margin-bottom"
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </Link>

                <button
                  className="btn btn-danger margin-bottom"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(card.id, true);
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div className=" mb-2">
        <h3>{singleDeck.name}</h3>
        <p>{singleDeck.description}</p>
        <Link to={`${url}/edit`} className="btn btn-secondary">
          <i className="bi bi-pencil-square"></i> Edit
        </Link>
        <Link to={`${url}/study`} className="btn btn-primary">
          <i className="bi bi-book"></i> Study
        </Link>

        <Link to={`${url}/cards/new`} className="btn btn-primary">
          <i className="bi bi-plus-square"></i> Add Cards
        </Link>
        <button
          className="btn btn-danger float-right margin-bottom"
          onClick={(e) => {
            e.preventDefault();
            handleDelete(singleDeck.id);
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
      <div>
        <h2>Cards</h2>
        <div>{cardsListed()}</div>
      </div>
    </div>
  );
}

export default Deck;
