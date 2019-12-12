import React from "react";
import "./scss/app.scss";
import Search from "./components/Search";
import MyShows from "./components/MyShows";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/MyShows">My shows</Link>
              </li>
              <li>
                <Link to="/Search">Search</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <main className="container">
              <Route path="/MyShows">
                <MyShows />
              </Route>
              <Route path="/Search">
                <Search />
              </Route>
            </main>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
