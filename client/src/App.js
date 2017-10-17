import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Account from './components/Account';
import Game from './components/Game';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <div className='background'>
    <NavBar className="Nav" />
    <FetchUser>
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/account" component={Account} />
        <ProtectedRoute path="/game" component={Game} />
        {/*<ProtectedRoute path="/account" render={ (props) => <Account {...props} title="My Account" /> } />*/}
        <Route exact path="/" render={ (props) => <Login {...props} title="FOODMOOD" /> } />
        <Route path="/about" component={About} />
        <Route path="/register" render={ (props) => <Auth {...props} title="Sign Up If You're In The Mood For Food!" /> } />
        <Route path="/login" render={ (props) => <Login {...props} title="FOODMOOD" /> } />
     </Switch>
   </FetchUser>
  </div>
);

export default App;