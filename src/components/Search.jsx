import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader';

export default class Search extends React.Component {
    state = {
        showResults: false,
        showHits: false,
        peopleHits: false,
        hasError: false,
        fetchingShows: false,
        fetchingPeople: false,
    };

    search = (e) => {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        const searchValue = e.target.value.trim()

        if (searchValue !== '') {
            this.searchTimeout = setTimeout(() => this.searchHandler(searchValue), 300);
        }
    }

    searchHandler = (searchValue) => {
        if (!this.showResults) {
            this.setState({showResults: true})
        }

        this.setState({fetchingShows: true, fetchingPeople: true})
        this.setState({showHits: false, peopleHits: false})
        this.setState({hasError: false})

        fetch(' http://api.tvmaze.com/search/shows?q=' + searchValue)
            .then(response => response.json())
            .then(data => {
                this.setState({showHits: data})
                this.setState({fetchingShows: false})
            })
            .catch(() => {
                this.setState({hasError: true})
                this.setState({fetchingShows: false})
            })

        fetch(' http://api.tvmaze.com/search/people?q=' + searchValue)
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

    render() {
        const {showHits, peopleHits, fetchingShows, fetchingPeople, showResults} = this.state;

        return (
            <>
                <input type="text" placeholder="Search your favorite TV show/actor" className="input-search"
                       onChange={evt => this.search(evt)}/>
                {showResults &&
                <>
                    <div>
                        <h1>TV Shows</h1>
                        {showHits.length > 0 &&
                        <ul>
                            {showHits.map(hit =>
                                <li key={hit.show.id}>
                                    <a href={hit.show.url}>{hit.show.name}</a>
                                </li>
                            )}
                        </ul>
                        }

                        {showHits.length === 0 &&
                        <p>There were no results for TV Shows.</p>
                        }

                        <SyncLoader loading={fetchingShows}/>
                    </div>

                    <div>
                        <h1>People</h1>
                        {peopleHits.length > 0 &&
                        <ul>
                            {peopleHits.map(hit =>
                                <li key={hit.person.id}>
                                    <a href={hit.person.url}>{hit.person.name}</a>
                                </li>
                            )}
                        </ul>
                        }
                        {peopleHits.length === 0 &&
                        <p>There were no results for people.</p>
                        }

                        <SyncLoader loading={fetchingPeople}/>
                    </div>
                </>
                }
            </>
        )
    }
}
