import React from 'react'

export default class Search extends React.Component {
    state = {
        showHits: [],
        peopleHits: [],
        hasError: false,
        fetchingShows: false,
        fetchingPeople: false,
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            this.setState({fetchingShows: true, fetchingPeople: true})
            this.setState({showHits: [], peopleHits: []})
            this.setState({hasError: false})

            fetch(' http://api.tvmaze.com/search/shows?q=' + e.target.value)
                .then(response => response.json())
                .then(data => {
                    this.setState({showHits: data})
                    this.setState({fetchingShows: false})
                })
                .catch(() => {
                    this.setState({hasError: true})
                    this.setState({fetchingShows: false})
                })

            fetch(' http://api.tvmaze.com/search/people?q=' + e.target.value)
                .then(response => response.json())
                .then(data => {
                    this.setState({peopleHits: data})
                    this.setState({fetchingPeople: false})
                })
                .catch(() => {
                    this.setState({hasError: true})
                    this.setState({fetchingPeople: false})
                })
        }
    }

    render() {
        const {showHits, peopleHits, fetchingShows, fetchingPeople} = this.state;

        return (
            <>
                <input type="text" placeholder="Search your favorite TV show" className="input-search"
                       onKeyDown={this.handleKeyDown}/>

                {(fetchingShows || fetchingPeople) &&
                <>
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </>
                }

                {showHits.length > 0 &&
                <div>
                    <h1>TV Shows</h1>
                    <ul>
                        {showHits.map(hit =>
                            <li key={hit.show.id}>
                                <a href={hit.show.url}>{hit.show.name}</a>
                            </li>
                        )}
                    </ul>
                </div>
                }

                {peopleHits.length > 0 &&
                <div>
                    <h1>People</h1>
                    <ul>
                        {peopleHits.map(hit =>
                            <li key={hit.person.id}>
                                <a href={hit.person.url}>{hit.person.name}</a>
                            </li>
                        )}
                    </ul>
                </div>
                }
            </>
        )
    }
}
