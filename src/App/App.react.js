import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './Admin/Admin.react';
import Navbar from './Navbar/Navbar.react';
import Profile from './Profile/Profile.react';
import Resources from './Resources/Resources.react';
import SignIn from './SignIn/SignIn.react';
import Signup from './Signup/Signup.react';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Resources} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={Signup} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;