import React from "react";
import "./scss/app.scss";
import Search from "./components/Search";
import MyShows from "./components/MyShows";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  state = {
    followedShows: []
  };

  toggleFollowShow(id) {
    const showIndex = this.state.followedShows.indexOf(id);

    if (showIndex !== -1) {
      let array = this.state.followedShows
      array.splice(showIndex, 1)

      this.setState({
        followedShows: array
      });
    } else {
      this.setState({
        followedShows: [...this.state.followedShows, id]
      });
    }
  }

  render() {
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
            <main className="container">
              <Switch>
                <Route path="/MyShows">
                  <MyShows followedShows={this.state.followedShows} />
                </Route>
                <Route path="/Search">
                  <Search
                    followedShows={this.state.followedShows}
                    toggleFollowShow={this.toggleFollowShow.bind(this)}
                  />
                </Route>
              </Switch>
            </main>
          </Router>
        </header>
      </div>
    );
  }
}
