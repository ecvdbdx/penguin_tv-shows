import React from "react";
import "./scss/app.scss";
import Search from "./components/Search";
import MyShows from "./components/MyShows";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  state = {
    followedShow: []
  };

  toggleFollowShow(id) {
    var showIndex = this.state.followedShow.indexOf(id);

    if (showIndex !== -1) {
      console.log("ca marche");
      this.setState({
        followedShow: this.state.followedShow.splice(showIndex, 1)
      });
    } else {
      console.log("ca marche pas");
      this.setState({ followedShow: this.state.followedShow.push(id) });
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
                  <MyShows />
                </Route>
                <Route path="/Search">
                  <Search
                    followedShow={this.state.followedShow}
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
