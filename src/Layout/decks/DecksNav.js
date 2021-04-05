import React, { useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import Breadcrumbs from "./Breadcrumbs";
import AddEditDeck from "./forms/AddEditDeck";
import AddEditCard from "./forms/AddEditCard";

import Study from "./Study";
import Deck from "./ViewDeck";

function DecksNav({ decks, setDecks }) {
  const [cardsList, setCardsList] = useState([]);
  const [singleDeck, setSingleDeck] = useState({});
  const { location } = useHistory();

  const { path } = useRouteMatch();

  return (
    <div className="w-100">
      <Breadcrumbs location={location} singleDeck={singleDeck} />
      <Switch>
        <Route exact path={`${path}/new`}>
          <AddEditDeck
            isnew={true}
            decks={decks}
            singleDeck={singleDeck}
            setSingleDeck={setSingleDeck}
          />
        </Route>
        <Route exact path={`${path}/:deckId/edit`}>
          <AddEditDeck
            isnew={false}
            decks={decks}
            singleDeck={singleDeck}
            setSingleDeck={setSingleDeck}
          />
        </Route>
        <Route exact path={`${path}/:deckId/study`}>
          <Study
            cardsList={cardsList}
            setCardsList={setCardsList}
            singleDeck={singleDeck}
            setSingleDeck={setSingleDeck}
          />
        </Route>
        <Route exact path={`${path}/:deckId`}>
          <Deck
            cards={cardsList}
            setCards={setCardsList}
            singleDeck={singleDeck}
            setSingleDeck={setSingleDeck}
          />
        </Route>
        <Route exact path={`${path}/:deckId/cards/new`}>
          <AddEditCard
            singleDeck={singleDeck}
            isnew={true}
            setSingleDeck={setSingleDeck}
          />
        </Route>
        <Route exact path={`${path}/:deckId/cards/:cardId/edit`}>
          <AddEditCard
            singleDeck={singleDeck}
            isnew={false}
            setSingleDeck={setSingleDeck}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default DecksNav;
