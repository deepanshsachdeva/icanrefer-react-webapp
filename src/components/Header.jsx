import { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';

import AppContext from '../contexts/AppContext';

import { deleteSession } from '../services';
import Button from './core/Button';

const Header = () => {
    const [appState, setAppState] = useContext(AppContext);

    const history = useHistory();

    const logoutHandler = () => {
        deleteSession()
        .then((res) => {
            setAppState({...appState, auth: false});
            history.push('/');
        })
        .catch((err) => {
            //
        });
    };

    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {!appState.auth && <li>
                        <Link to="/login">Login</Link>
                    </li>}
                    {appState.auth && <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>}
                    {appState.auth && <li>
                        <Link to="/create">Create</Link>
                    </li>}
                    {appState.auth && <li>
                        <Button className="btn btn-secondary" onClick={logoutHandler} >Logout</Button>
                    </li>}
                </ul>
            </nav>
        </header>
    );
}

export default Header;