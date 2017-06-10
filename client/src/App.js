import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Auth from './components/Auth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <div>
    <FetchUser>
      <Switch>
        <Route exact path="/" render={ (props) => <Login {...props} title="Welcome" /> } />
        <Route path="/about" component={About} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/register" render={ (props) => <Auth {...props} title="Register" /> } />
        <Route path="/login" render={ (props) => <Login {...props} title="Welcome" /> } />
     </Switch>
   </FetchUser>
  </div>
);

export default App;