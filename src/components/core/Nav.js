import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated, isAdmin } from '../../apiMethods/auth';

function Nav({history}) {

    const isActive = (history, path) => {
        if(history.location.pathname === path) 
            return {color:'#f90', textDecorationLine:'none'}
        return {color:'white'};
    }

    const {user} = isAuthenticated();

    const dashboardPath = isAdmin() ? '/admin/dashboard' : '/user/dashboard';

    return  <nav className="navbar navbar-default bg-primary">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="nav-link" style={{color:'white', fontWeight:'bolder'}} to='/'>Epsilon</Link>
                    </div>
                    <ul className="nav nav-tabs" >
                        <li className="nav-item">
                                <Link className="nav-link" style={isActive(history,'/')} to='/'>Home</Link>
                        </li>

                        <li className="nav-item">
                                <Link className="nav-link" style={isActive(history,'/search')} to='/search'>Search</Link>
                        </li>

                        {!user ?
                        (<Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history,'/signup')} to='/signup'>Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history,'/signin')} to='/signin'>Sign In</Link>
                            </li>
                        </Fragment>)
                        :
                        (<Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history,dashboardPath)} 
                                                            to={dashboardPath}
                                > Dashboard 
                                </Link>                                                                           
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" 
                                    style={{cursor:'pointer', color:'#fff'}}
                                    onClick={() => signOut(() => history.push('/'))}
                                >Sign Out
                                </span>
                            </li>
                        </Fragment>)}
                    </ul>
                </div>
            </nav>
}

export default withRouter(Nav);