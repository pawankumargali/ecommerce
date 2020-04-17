import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signUp, signIn, setToken, isAuthenticated, isAdmin } from '../../apiMethods/auth';

function Form({ title }) {

    const btnName = title==='SignUp' ? 'Register' : 'Login';

    const showNameField = () => title==='SignUp' && <div className="form-group"> 
                                                        <label className="text-muted">Name</label>
                                                        <input type="text" 
                                                            onChange={handleChange('name')}
                                                            value={name}
                                                            autoFocus
                                                            className="form-control" 
                                                        />
                                                    </div>;


    const [vals, setVals] = useState({ name:'', email:'admn@db.com', password:'DragonballAdmn@1', error:false, success:false, redirectToReferrer:false});
                                     
    const {name, email, password, error, success, redirectToReferrer} = vals;

    const handleChange = name => e => setVals({...vals,[name]:e.target.value});

    const handleSubmit = e => {

        e.preventDefault();

        // Handle submit for Sign Up
        if(title==='SignUp') { 

            signUp({name, email, password})
                .then(data => {
                        if(data.err) 
                            setVals({...vals,error:data.err, success:false});
                        else 
                            setVals({...vals, name:'', email:'', password:'', error:false, success:true});
                });

        }

        // Handle submit for Sign In
        else {

            signIn({email, password})
                .then(data => {
                        if(data.err)
                            setVals({...vals,error:data.err, success:false});
                        else
                            setToken(data, () => setVals({...vals,error:false, redirectToReferrer:true}));                    
                });
        }      
    }
 

    // Displays errors in signing up / signing in user
    const showErr = () => <div className="alert alert-danger" style={{display:error ? '' :'none'}}>
                            {error}
                          </div>

    // Displays alert when Sign In is successful
    const showSuccess =  () => (
            success && title==='SignUp' &&
                <div className="alert alert-info">
                    User registered successfully. Proceed to  <Link to='/signin'>Sign In</Link>
                </div>
    );

    // Redirects user on successful Sign In
    const redirectUserToReferrer = () =>  {
        if(redirectToReferrer===true) {
            if(isAdmin())  
                return <Redirect to='/admin/dashboard'/>
            else if(isAuthenticated()) 
                return <Redirect to='/user/dashboard'/>
        }
    }

    const showForm = () => (

        <form>
            {/* Name */}
            {showNameField()}  

            {/* Email */}
            <div className="form-group"> 
                <label className="text-muted">Email</label>
                <input type="email" 
                        onChange={handleChange('email')} 
                        value={email}
                        className="form-control" 
                />
            </div>

            {/* Password */}
            <div className="form-group"> 
                <label className="text-muted">Password</label>
                <input type="password" 
                        onChange={handleChange('password')} 
                        value={password}
                        className="form-control" 
                />
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary" style={{color:'#fff', backgroundColor:'#009688'}} onClick={handleSubmit}>{btnName}</button>

        </form>
    );
                            
    return  <div> 
                {showErr()}

                {/* For Sign Up */}
                {showSuccess()}

                {showForm()}

                {/* For Sign In */}
                {redirectUserToReferrer()}
            </div>  

}

export default Form;