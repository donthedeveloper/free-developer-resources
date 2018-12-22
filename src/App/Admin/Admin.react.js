import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Resources from './Resources/Resources.react';

const Admin = (props) => {
    return (
        <Switch>
            {/* <Route exact path='/blog' component={Blog} /> */}
            <Route path={`${props.match.url}/resources`} component={Resources} />
            <Redirect to={`${props.match.url}/resources`} />
        </Switch>
    );
};

export default Admin;