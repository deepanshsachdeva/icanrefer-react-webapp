import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import AppContext from '../../contexts/AppContext';
import { createSession, getAlertMessage } from '../../services';

import Input from '../core/Input';
import Button from '../core/Button';
import Alert from '../core/Alert';


const Login = (props) => {
    const [appState, setAppState] = useContext(AppContext);

    const [username, setUsername] = useState('');
    const [alert, setAlert] = useState({type: '', message: ''});

    const history = useHistory();

    const usernameHandler = (value) => {
        setUsername(value.trim());
    };

    const handleLogin = () => {
        createSession(username)
        .then((res) => {
            setAppState({...appState, auth: true});
            history.push('/dashboard');
        })
        .catch((e) => {
            setAppState({...appState, auth: false});
            setAlert({...alert, type: 'invalid', message: getAlertMessage(e.error)});
        });
    }

    return(
        (appState.auth)
            ? <Redirect to={{ pathname: "/dashboard" }} />
            : <div className="login-container">
            <div className="heading-container">
                <h1>Login</h1>
            </div>
            <div className="form-container">
                <Alert type={alert.type}>{alert.message}</Alert>
                <div className="form-group">
                    <Input 
                        value={username}
                        className="input-control" 
                        placeholder="enter username here..." 
                        onChangeHandler={usernameHandler}
                    />
                    <Button 
                        className="btn" 
                        style={{width: '100%'}} 
                        onClick={handleLogin}
                        disabled={username.length < 3}
                    >Login</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;