import React from 'react';
import Layout from '../core/Layout';
import Form from '../core/Form';

function SignIn() {
    return <div>
                 <Layout title="Sign in" 
                         description="Sign in to Node React e-commerce App"
                         childClassName="container col-md-4 offset-md-4">
                    <Form title = 'SignIn'/>
                </Layout>
           </div>;
}

export default SignIn;