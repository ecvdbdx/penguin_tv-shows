import React from "react";
import ShowList from "./ShowList";

export default class MyShows extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedShows: null
        };
    }

    componentDidMount() {
        if (this.props.followedShows.length) {
            let promises = this.props.followedShows.map(id =>
                fetch(" http://api.tvmaze.com/shows/" + id)
                    .then(data => data.text()))

            Promise.all(promises).then(results => results).then(result => {
                const res = result.map(res => JSON.parse(res))

                this.setState({
                    fetchedShows: res.map(result => {
                        return {show: result}
                    })
                });
            })
        }
    }

    render() {
        const {fetchedShows} = this.state;

        return (
            <div>
                <ShowList
                    list={fetchedShows}
                    followedShows={this.props.followedShows}
                    toggleFollowShow={this.props.toggleFollowShow}
                />
            </div>
        );
    }
}
