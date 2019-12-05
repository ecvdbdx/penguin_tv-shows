import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader';

export default class PeopleList extends React.Component {
    displayImage(image, alt) {
        let src

        if (image === null || image.medium === null) {
            src = 'https://via.placeholder.com/201x295'
        } else {
            src = image.medium
        }

        return <img src={src} alt={alt}/>
    }

    displayList() {
        if (this.props.list === null) {
            return (<SyncLoader/>)
        } else if (this.props.list.length === 0) {
            return (<p>There is no people.</p>)
        } else if (this.props.list.length > 0) {
            return (
                <div className="cards">
                    {this.props.list.map(hit =>
                        <div key={hit.person.id} className="card">
                            <a href={hit.person.url} className="card-inner">
                                {this.displayImage(hit.person.image, hit.person.name + '\'s portrait')}
                                <div className="title">
                                    {hit.person.name}
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
                <h1>People</h1>
                {this.displayList()}
            </div>
        )
    }
}
