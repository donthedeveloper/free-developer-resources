import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import CreateResource from './CreateResource/CreateResource.react';
import ResourceList from './ResourceList/ResourceList.react';
import './Resources.styles.scss';

const Resources = (props) => {
    return (
        <div>
            <div className='resources-navbar'>
                <ul className='resources-navbar-list'>
                    <li>
                        <Link
                            className='resources-navbar__link'
                            to={`${props.match.url}/create`}
                        >
                            Create Resource
                        </Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route exact path={`${props.match.url}`} component={ResourceList} />
                <Route path={`${props.match.url}/create`} component={CreateResource} />
            </Switch>
        </div>
    );
};

export default Resources;