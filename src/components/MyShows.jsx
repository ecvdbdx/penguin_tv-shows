import React from "react";

export default class MyShows extends React.Component {
  render() {
    return (
      <div>
        <h1>TV Shows</h1>
        {this.displayList()}
      </div>
    );
  }
}
