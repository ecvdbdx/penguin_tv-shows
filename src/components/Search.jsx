import React from "react";
import ShowList from "./ShowList";
import PeopleList from "./PeopleList";

export default class Search extends React.Component {
  state = {
    hasAlreadySearched: false,
    showHits: null,
    peopleHits: null,
    hasError: false
  };

  search(e) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    const searchValue = e.target.value.trim();

    if (searchValue !== "") {
      this.searchTimeout = setTimeout(
        () => this.searchHandler(searchValue),
        300
      );
    }
  }

  searchHandler(searchValue) {
    if (!this.hasAlreadySearched) {
      this.setState({ hasAlreadySearched: true });
    }

    this.setState({ showHits: null, peopleHits: null });
    this.setState({ hasError: false });

    fetch(" http://api.tvmaze.com/search/shows?q=" + searchValue)
      .then(response => response.json())
      .then(data => {
        this.setState({ showHits: data });
      })
      .catch(() => {
        this.setState({ hasError: true });
      });

    fetch(" http://api.tvmaze.com/search/people?q=" + searchValue)
      .then(response => response.json())
      .then(data => {
        this.setState({ peopleHits: data });
      })
      .catch(() => {
        this.setState({ hasError: true });
      });
  }

  render() {
    const { showHits, peopleHits, hasAlreadySearched } = this.state;

    return (
      <>
        <input
          type="text"
          placeholder="Search your favorite TV show/actor"
          className="input-search"
          onChange={evt => this.search(evt)}
        />
        {hasAlreadySearched && (
          <>
            <ShowList
              list={showHits}
              followedShows={this.props.followedShows}
              toggleFollowShow={this.props.toggleFollowShow}
            />
            <PeopleList list={peopleHits} />
          </>
        )}
      </>
    );
  }
}
