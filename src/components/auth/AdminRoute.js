import React from 'react';
import { isAdmin, isAuthenticated } from '../../apiMethods/auth';
import { Route, Redirect } from 'react-router-dom';

function AdminRoute({component:Component, ...rest}) {
    return <Route  {...rest} render={ props => isAdmin() ?
                                        (<Component {...props} />) :
                                        (isAuthenticated() ?
                                          <Redirect to={{pathname:'/', state:{from:props.location}}}/> :
                                          <Redirect to={{pathname:'/signin',state:{from:props.location}}}/>
                                        )
                                    }
             />
}

export default AdminRoute;