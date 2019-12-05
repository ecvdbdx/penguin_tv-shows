import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader';

export default class ShowList extends React.Component {

    displayList() {
        if (this.props.list === null) {
            return (<SyncLoader/>)
        } else if (this.props.list.length === 0) {
            return (<p>There are no TV Shows.</p>)
        } else if (this.props.list.length > 0) {
            return (
                <div className="shows">
                    {this.props.list.map(hit =>
                        <div key={hit.show.id} className="show">
                            <a href={hit.show.url} className="show-inner">
                                {hit.show.image !== null &&
                                <img src={hit.show.image.medium} alt={hit.show.name + '\'s cover'}/>
                                }

                                <div className="name">
                                    {hit.show.name}
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>TV Shows</h1>
                {this.displayList()}
            </div>
        )
    }
}
