import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ResourceTable from '../ResourceTable/ResourceTable.react';

const Admin = (props) => {
    return (
        <Switch>
            {/* <Route exact path='/blog' component={Blog} /> */}
            <Route path={`${props.match.url}/resources`} component={ResourceTable} />
            <Redirect to={`${props.match.url}/resources`} />
        </Switch>
    );
};

export default Admin;