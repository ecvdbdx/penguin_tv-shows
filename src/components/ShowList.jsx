import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader';

export default class ShowList extends React.Component {
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
            return (<p>There are no TV Shows.</p>)
        } else if (this.props.list.length > 0) {
            return (
                <div className="cards">
                    {this.props.list.map(hit =>
                        <div key={hit.show.id} className="card">
                            <a href={hit.show.url} className="card-inner">
                                {this.displayImage(hit.show.image, hit.show.name + '\'s cover')}

                                <div className="title">
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
