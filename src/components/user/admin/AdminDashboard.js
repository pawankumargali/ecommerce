import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout';
import { isAuthenticated } from '../../../apiMethods/auth';
 
function AdminDashboard() {
    const {user:{name, email, role}} = isAuthenticated();

    const adminInfo = () => (<div className="card">
                                <h4 className="card-header">User Info</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">name: {name}</li>
                                    <li className="list-group-item">email: {email}</li>
                                    {   role===1 &&
                                        <li className="list-group-item">role: Admin</li>
                                    }
                                </ul>
                           </div>);

    const adminLinks = () => (<div className="card">
                                <h4 className="card-header">Links</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link className="nav-link" to="/category/dashboard">Categories</Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link className="nav-link" to="/product/dashboard">Products</Link>
                                    </li>
                                    <li className="list-group-item"></li>
                                </ul>
                            </div>);


    return  <Layout title="Dashboard" description={`Welcome ${name}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-lg-3 col-md-3">
                            {adminLinks()}
                        </div>
                        <div className="col col-lg-9 col-md-9">
                            {adminInfo()}
                        </div>
                    </div>
                </div>
            </Layout>;
}

export default AdminDashboard;