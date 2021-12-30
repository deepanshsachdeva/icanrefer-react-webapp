import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContext from '../contexts/AppContext';

import ProtectedRoute from './core/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import View from './pages/View';
import About from './pages/About';
import NotFound from './pages/NotFound';

const Routes = () => {
    const [appState] = useContext(AppContext);

    return(
        <Switch>
            <Route exact path='/'><Home /></Route>
            <Route path='/about'><About /></Route>
            <Route path='/login'><Login /></Route>
            <ProtectedRoute path='/dashboard' isAuth={appState.auth} component={Dashboard} />
            <ProtectedRoute path='/create' isAuth={appState.auth} component={Create} />
            <ProtectedRoute path='/view/:rid' isAuth={appState.auth} component={View} />
            <Route path='*'><NotFound /></Route>
        </Switch>
    );
}

export default Routes;