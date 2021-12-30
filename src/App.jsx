import { useEffect, useState } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import AppContext from './contexts/AppContext';

import Header from './components/Header';
import Routes from './components/Routes';

import { fetchSession}  from './services';

function App() {
    const [appState, setAppState] = useState({auth: false});

    useEffect(() => {
        fetchSession()
        .then((res) => {
            const { username } = res.data; 
            setAppState({...appState, auth: true, username: username});
        })
        .catch((err) => {
            setAppState({...appState, auth: false});
        });
    }, []);

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            <Router>
                <Header />
                <main>
                    <div className="app-container">
                        <div className="main-container">
                            <div className="heading-container">
                                <h1>I Can Refer</h1>
                            </div>
                            <div className="content-container">
                                <Routes />
                            </div>
                        </div>
                    </div>
                </main>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
