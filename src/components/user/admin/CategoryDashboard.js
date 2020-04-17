import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout';
import AddCategory from './category/AddCategory';

function CategoryDashboard() {

    const goBack = () => <button className="btn btn-primary" style={{backgroundColor:'#009688'}}> 
                            <Link to='/admin/dashboard' style={{color:'#fff'}}>Back to Dashboard</Link> 
                         </button>
    return <Layout  title="Categories"
                    description={goBack()}
                    childClassName="container-fluid"
            >
                <div className="row">
                    <AddCategory />
                </div>  
            </Layout>
}

export default CategoryDashboard;