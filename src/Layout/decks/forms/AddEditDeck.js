import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../../../utils/api";

function AddEditDeck({ isnew, singleDeck, setSingleDeck }) {
  let initialFormState = {
    name: "",
    description: "",
  };
  const history = useHistory();
  const { deckId } = useParams();
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    if (!isnew) {
      readDeck(deckId)
        .then((thisDeck) => {
          return setSingleDeck((origDeck) => {
            return { ...origDeck, ...thisDeck };
          });
        })

        .catch((error) => console.log(error));
      setFormData((origForm) => {
        return {
          ...origForm,
          name: singleDeck.name,
          description: singleDeck.description,
        };
      });
    }
  }, [deckId, isnew, setSingleDeck, singleDeck.description, singleDeck.name]);
  let placeholders = {
    heading: "",
    name: "",
    description: "",
  };

  let handleSubmit;
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  if (isnew) {
    placeholders = {
      heading: "Create Deck",
      name: "Deck Name",
      description: "Brief description of the deck",
    };

    handleSubmit = (event) => {
      event.preventDefault();

      createDeck(formData)
        .then(setFormData({ ...initialFormState }))
        .then(
          setSingleDeck((origDeck) => {
            return { ...origDeck, formData };
          })
        )
        .then(({ id }) => history.push(`/decks/${id}`));
    };
  } else {
    if (singleDeck) {
      placeholders = {
        heading: "Edit Deck",
        name: `${singleDeck.name}`,
        description: `${singleDeck.description}`,
      };
    }
    handleSubmit = (event) => {
      event.preventDefault();
      let newDeck = {
        ...singleDeck,
        name: formData.name,
        description: formData.description,
      };

      updateDeck(newDeck).then(({ id }) => history.push(`/decks/${id}`));
    };
  }
  return (
    <div>
      <h2>{placeholders.heading}</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">
          Name:
        </label>
        <input
          className="form-control"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData ? formData.name : "Loading.."}
          placeholder={placeholders.name}
        />

        <br />
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <textarea
          className="form-control"
          id="description"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData ? formData.description : "Loading.."}
          placeholder={placeholders.description}
        />

        <br />
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEditDeck;
