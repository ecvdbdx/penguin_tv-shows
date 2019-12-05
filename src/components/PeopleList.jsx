import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader';

export default class PeopleList extends React.Component {

    displayList() {
        if (this.props.list === null) {
            return (<SyncLoader/>)
        } else if (this.props.list.length === 0) {
            return (<p>There is no people.</p>)
        } else if (this.props.list.length > 0) {
            return (
                <ul>
                    {this.props.list.map(hit =>
                        <li key={hit.person.id}>
                            <a href={hit.person.url}>{hit.person.name}</a>
                        </li>
                    )}
                </ul>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>People</h1>
                {this.displayList()}
            </div>
        )
    }
}
