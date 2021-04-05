import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../../../utils/api";

function AddEditCard({ singleDeck, isnew, setSingleDeck }) {
  const history = useHistory();
  let initialCardState = {
    front: "",
    back: "",
  };
  const [cardData, setCardData] = useState(initialCardState);
  const [formData, setFormData] = useState(initialCardState);
  const params = useParams();

  useEffect(() => {
    readDeck(params.deckId)
      .then(setSingleDeck)
      .catch((error) => console.log(error));
  }, [
    isnew,
    params.deckId,
    setSingleDeck,
    singleDeck.description,
    singleDeck.name,
  ]);
  useEffect(() => {
    if (!isnew) {
      readCard(params.cardId)
        .then(setFormData)
        .then(setCardData)
        .catch((error) => console.log(error));
    }
  }, [isnew, params.cardId]);
  let placeholders = {
    heading: "",
    name: "",
    description: "",
  };
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  let handleSubmit;
  if (isnew) {
    placeholders = {
      heading: `${singleDeck.name}: Add Card`,
      front: "Front side of card",
      back: "Back side of card",
    };

    handleSubmit = (event) => {
      event.preventDefault();

      createCard(params.deckId, formData)
        .then(setFormData({ ...initialCardState }))

        .then(history.push(`/decks/${params.deckId}`))
        .catch((error) => console.log(error));
    };
  } else {
    if (cardData) {
      placeholders = {
        heading: "Edit Card",
        front: `${cardData.front}`,
        back: `${cardData.back}`,
      };
    }
    handleSubmit = (event) => {
      event.preventDefault();

      updateCard(formData)
        .then(history.push(`/decks/${params.deckId}`))
        .catch((error) => console.log(error));
    };
  }
  return (
    <div>
      <h2>{placeholders.heading}</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="front">
          Front:
        </label>
        <textarea
          className="form-control"
          id="front"
          type="text"
          name="front"
          onChange={handleChange}
          value={formData.front}
          placeholder={placeholders.front}
        />

        <br />
        <label className="form-label" htmlFor="back">
          Back:
        </label>
        <textarea
          className="form-control"
          id="back"
          type="text"
          name="back"
          onChange={handleChange}
          value={formData.back}
          placeholder={placeholders.back}
        />

        <br />
        <Link className="btn btn-secondary" to={`/decks/${params.deckId}`}>
          Cancel
        </Link>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEditCard;
