import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../../apiMethods/auth';
 
function UserDashboard() {
    const {user:{name, email, role, purchase_history}} = isAuthenticated();

    const userInfo = () => (<div className="card">
                                <h4 className="card-header">User Info</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">name: {name}</li>
                                    <li className="list-group-item">email: {email}</li>
                                    {   role===1 &&
                                        <li className="list-group-item">role: Admin</li>
                                    }
                                </ul>
                           </div>);

    const userLinks = () => (<div className="card">
                                <h4 className="card-header">Links</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link className="nav-link" to="/cart">Cart</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link className="nav-link" to="/profile/update">Update profile</Link>
                                    </li>
                                    <li className="list-group-item"></li>
                                </ul>
                            </div>);

    const purchaseHistory = () => (<div className="card">
                                        <h4 className="card-header">Purchase History</h4>
                                        <ul className="list-group">
                                        {purchase_history.length===0 ?
                                        <li className="list-group-item">Nil</li>                             :
                                        purchase_history.map(item => <li className="list-group-item">{item}</li>)
                                        }
                                        </ul>
                                   </div>);

    return  <Layout title="Dashboard" description={`Welcome ${name}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-md-3">
                        {userLinks()}
                        </div>
                        <div className="col col-md-9">
                        {userInfo()}
                        {purchaseHistory()}
                        </div>
                    </div>
                </div>
            </Layout>;
}

export default UserDashboard;