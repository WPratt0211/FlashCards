import React, { Fragment, useState } from "react";
import { Route } from "react-router";
import Header from "./Header";

import { Switch } from "react-router-dom";
import DeckList from "./decks/DeckList";
import DecksNav from "./decks/DecksNav";
import NotFound from "./NotFound";

function Layout() {
  const [decks, setDecks] = useState([]);
  return (
    <Fragment>
      <Header />
      <div className="container px-5">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/decks">
            <DecksNav setDecks={setDecks} decks={decks} />
          </Route>
          <Route exact path="/">
            <DeckList setDecks={setDecks} decks={decks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
