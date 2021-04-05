import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { readDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";

function Study({ cardsList, singleDeck, setSingleDeck, setCardsList }) {
  const { deckId } = useParams();
  const history = useHistory();

  const initCardState = {
    index: 0,
    frontOfCard: true,
  };
  let [cardData, setCardData] = useState(initCardState);
  let cardText = "";

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
      setCardsList(singleDeck.cards);
    }
    return abortController.abort();
  }, [deckId, setCardsList, singleDeck]);

  const handleFlip = (event) => {
    event.preventDefault();
    setCardData((data) => {
      return {
        ...data,
        frontOfCard: !cardData.frontOfCard,
      };
    });
  };
  const handleNext = (event) => {
    event.preventDefault();
    if (cardData.index + 1 === cardsList.length) {
      let result = window.confirm(
        "Restart cards? \n \n Click 'cancel' to return to the home page"
      );
      result
        ? setCardData((data) => {
            return {
              ...data,
              index: 0,
              frontOfCard: true,
            };
          })
        : history.push("/");
    } else {
      setCardData((data) => {
        return { ...data, index: cardData.index + 1, frontOfCard: true };
      });
    }
  };

  if (cardsList.length !== 0) {
    cardData.frontOfCard
      ? (cardText = cardsList[cardData.index].front)
      : (cardText = cardsList[cardData.index].back);
  }
  return (
    <div>
      <h2 className="mb-2">{singleDeck.name}: Study</h2>
      {cardsList.length < 3 ? (
        <div>
          <h3>Not enough cards</h3>
          <p>
            You need at least 3 cards to study. There are {cardsList.length}{" "}
            cards in this deck.
          </p>
          <Link to="cards/new" className="btn btn-primary">
            <i className="bi bi-plus-square"></i> Add Cards
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              Card {cardData.index + 1} of {cardsList.length}
            </div>
            <div className="card-text">{cardText}</div>
            <div className="row">
              <button
                className="btn btn-secondary mt-3 mx-3"
                onClick={handleFlip}
              >
                <i className="bi bi-arrow-repeat"></i> Flip
              </button>
              {!cardData.frontOfCard ? (
                <button className="btn btn-primary mt-3" onClick={handleNext}>
                  <i className="bi bi-arrow-right-square"></i> Next
                </button>
              ) : (
                <Fragment />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Study;
