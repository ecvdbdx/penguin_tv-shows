import React from 'react';
import './scss/app.scss';
import Search from "./components/Search";

function App() {
    return (
        <div className="App">
            <header>
                <nav>
                    Navbar
                </nav>
            </header>
            <main>
                <Search/>
            </main>
        </div>
    );
}


export default App;
