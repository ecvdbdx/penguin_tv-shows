import React from 'react'

export default class Search extends React.Component {
    state = {
        hits: [],
        hasError: false,
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            this.setState({hits: []})
            this.setState({hasError: false})

            fetch(' http://api.tvmaze.com/search/shows?q=' + e.target.value)
                .then(response => response.json())
                .then(data => this.setState({hits: data}))
                .catch(() => this.setState({hasError: true}))
        }
    }

    render() {
        const {hits} = this.state;

        return (
            <>
                <input type="text" placeholder="Search your favorite TV show" className="input-search"
                       onKeyDown={this.handleKeyDown}/>

                <ul>
                    {hits.map(hit =>
                        <li key={hit.show.id}>
                            <a href={hit.show.url}>{hit.show.name}</a>
                        </li>
                    )}
                </ul>

            </>
        )
    }
}
