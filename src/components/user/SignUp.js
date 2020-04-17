import React from 'react';
import Layout from '../core/Layout';
import Form from '../core/Form';

function SignUp() {
    return <div>
                 <Layout title="Sign Up" 
                         description="Sign Up to Node React e-commerce App"
                         childClassName="container col-md-4 offset-md-4">
                    <Form title='SignUp' />
                </Layout>
           </div>;
}

export default SignUp;