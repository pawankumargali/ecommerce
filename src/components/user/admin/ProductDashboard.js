import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout';
import AddProduct from './product/AddProduct';

function ProductDashboard() {

    const goBack = () => <button className="btn btn-primary" style={{backgroundColor:'#009688'}}> 
                            <Link to='/admin/dashboard' style={{color:'#fff'}}>Back to Dashboard</Link> 
                         </button>
    return <Layout
                title="Products"
                description={goBack()}
                childClassName="container-fluid"
           >
                <div className="row">
                    <AddProduct />
                </div> 
           </Layout>
}

export default ProductDashboard;