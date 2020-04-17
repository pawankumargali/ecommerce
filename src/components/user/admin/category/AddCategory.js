import React, {useState} from 'react';
import { isAuthenticated, isAdmin } from '../../../../apiMethods/auth';
import { createCategory } from '../../../../apiMethods/category';

function AddCategory() {

    const [vals,setVals] = useState({name:'', error:false, success:false});
    
    const handleChange =  e => setVals({...vals,name:e.target.value});

    const {name, error, success} = vals;

    const handleSubmit = e => {
       e.preventDefault();
       const {token, user } = isAuthenticated();
       if(isAdmin()){
            createCategory(token, user, name)
                        .then(data => {
                           if(data.err)
                                setVals({...vals,error:data.err, success:false});
                            else
                                setVals({...vals,error:false,success:true});
                        });
       } 
    };

    const showSuccess = () => {
        if(success) 
            return  <div className="text-success">Category has been successfully added</div>;
    }

    const showError = () => { 
        if(error) 
            return<div className="text-danger">{`${error}`}</div>;
    }

    const createCategoryForm = () => ( <form>
                                    {/* Category Name */}
                                    <div className="form-group"> 
                                        <label className="text-muted">Name</label>
                                        <input type="text" 
                                                onChange={handleChange} 
                                                value={name}
                                                className="form-control"
                                                autoFocus 
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button className="btn btn-outline-primary" onClick={handleSubmit}>Add</button>
                                    
                                </form>);


    return  <div className="col col-md-6">
                    <div className="card">
                        <h4 className="card-header">Add Category</h4>
                        <div className="card-body">
                            {createCategoryForm()}
                            {showError()}
                            {showSuccess()} 
                        </div>
                    </div>
            </div>
}

export default AddCategory;