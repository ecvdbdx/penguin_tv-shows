import React from 'react'

export default class Search extends React.Component {
    state = {
        showHits: [],
        peopleHits: [],
        hasError: false,
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            this.setState({showHits: [], peopleHits: []})
            this.setState({hasError: false})

            fetch(' http://api.tvmaze.com/search/shows?q=' + e.target.value)
                .then(response => response.json())
                .then(data => this.setState({showHits: data}))
                .catch(() => this.setState({hasError: true}))

            fetch(' http://api.tvmaze.com/search/people?q=' + e.target.value)
                .then(response => response.json())
                .then(data => this.setState({peopleHits: data}))
                .catch(() => this.setState({hasError: true}))
        }
    }

    render() {
        const {showHits, peopleHits} = this.state;

        return (
            <>
                <input type="text" placeholder="Search your favorite TV show" className="input-search"
                       onKeyDown={this.handleKeyDown}/>

                <h1>TV Shows</h1>
                <ul>
                    {showHits.map(hit =>
                        <li key={hit.show.id}>
                            <a href={hit.show.url}>{hit.show.name}</a>
                        </li>
                    )}
                </ul>

                <h1>People</h1>
                <ul>
                    {peopleHits.map(hit =>
                        <li key={hit.person.id}>
                            <a href={hit.person.url}>{hit.person.name}</a>
                        </li>
                    )}
                </ul>

            </>
        )
    }
}
