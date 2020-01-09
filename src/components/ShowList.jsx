import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default class ShowList extends React.Component {
  displayImage(image, alt) {
    let src =
      image === null || image.medium === null
        ? "https://via.placeholder.com/210x295"
        : image.medium;

    return (
      <div>
        <img src={src} alt={alt} />
        <h1>{this.props.followedShow}</h1>
      </div>
    );
  }
  displayLabel(id) {
    return this.props.followedShow.indexOf(id) !== -1
      ? "Unfollow this show"
      : "Follow this show";
  }

  displayList() {
    if (this.props.list === null) {
      return <SyncLoader />;
    } else if (this.props.list.length === 0) {
      return <p>There are no TV Shows.</p>;
    } else if (this.props.list.length > 0) {
      return (
        <div className="cards">
          {this.props.list.map(hit => (
            <div key={hit.show.id} className="card">
              <a href={hit.show.url} className="card-inner">
                {this.displayImage(hit.show.image, hit.show.name + "'s cover")}

                <div className="title">{hit.show.name}</div>
              </a>
              <div>
                <button
                  onClick={() => this.props.toggleFollowShow(hit.show.id)}
                >
                  {this.displayLabel(hit.show.id)}
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>TV Shows</h1>
        {this.displayList()}
      </div>
    );
  }
}
