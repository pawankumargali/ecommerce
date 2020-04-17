import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/core/Home'
import Search from './components/core/Search'
import SignUp from './components/user/SignUp'
import SignIn from './components/user/SignIn'
import PrivateRoute from './components/auth/PrivateRoute'
import UserDashboard from './components/user/UserDashboard'
import AdminRoute from './components/auth/AdminRoute'
import AdminDashboard from './components/user/admin/AdminDashboard'
import CategoryDashboard from './components/user/admin/CategoryDashboard'
import ProductDashboard from './components/user/admin/ProductDashboard'

function Routes() {
    return <div>
            <Router>             
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/search' exact component={Search} />
                    <Route path='/signup' exact  component={SignUp} />
                    <Route path='/signin' exact component={SignIn} />
                    <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                    <AdminRoute path='/category/dashboard' exact component={CategoryDashboard} />
                    <AdminRoute path='/product/dashboard' exact component={ProductDashboard} />
                </Switch>
            </Router>
           </div>
}

export default Routes;