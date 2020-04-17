import React, { useState, useEffect } from 'react';
import { isAuthenticated, isAdmin } from '../../../../apiMethods/auth';
import { addProduct } from '../../../../apiMethods/product';
import { getCategories } from '../../../../apiMethods/category';

function AddProduct() {

    const [vals, setVals] = useState({name:'',
                                      description:'', 
                                      price:0,
                                      categories:[],
                                      category:'',
                                      quantity:0,
                                      image:undefined,
                                      shipping:'',
                                      formData:'',
                                      error:false,
                                      loading:false, 
                                      success:false});

    const {name, 
           description, 
           price, 
           categories ,
           category, 
           quantity, 
           shipping, 
           formData, 
           loading,
           error, 
           success} = vals;

    const init = () => {
        getCategories()
            .then( data => {
                if(data.err) 
                    setVals({...vals, error:data.err, success:false});
                else
                    setVals({...vals,categories:data, formData: new FormData()});
            })
    }

    useEffect(() => {
        init();
    });
                    
    const handleChange = name => e => {
        const value = name==='image' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setVals({...vals,[name]:value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { token, user } = isAuthenticated();
        if(isAdmin()) {
            setVals({...vals,loading:true,success:false,error:false});
            addProduct(token, user, formData)
                .then(data => {
                    if(data.err) 
                        setVals({...vals,error:data.err,loading:false,success:false});
                    else 
                        setVals({...vals,
                                name:'',
                                description:'',
                                price:0,
                                category:'',
                                quantity:0,
                                shipping:'',
                                image:undefined,
                                error:false,
                                loading:false,
                                success:true});
                });
        }
    }

    const showUploading = () => loading && <h2 className="text-info">Uploading...</h2>

    const showSuccess = () => success && <div className="text-success">Product has been successfully added</div>

    const showError = () => error && <div className="text-danger">{`${error}`}</div>

    const addProductForm = () => ( <form>
                                            {/* Category Name */}
                                        <div className="row">
                                            <div className="col col-md-6">
                                                <div className="form-group"> 
                                                    <label className="text-muted">Name</label>
                                                    <input type="text" 
                                                            onChange={handleChange('name')} 
                                                            value={name}
                                                            className="form-control"
                                                            autoFocus 
                                                    />
                                                </div>
                                                <div className="form-group"> 
                                                    <label className="text-muted">Description</label>
                                                    <textarea type="text" 
                                                                onChange={handleChange('description')} 
                                                                value={description}
                                                                className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group"> 
                                                        <label className="text-muted">Category</label>
                                                        <select
                                                            onChange={handleChange('category')} 
                                                            className="form-control"
                                                        >
                                                            <option value="">Select Category</option>   
                                                                {categories && categories.map( (cat, index) => 
                                                                    <option key={index}
                                                                            value={cat._id}
                                                                    >
                                                                        {cat.name}
                                                                    </option>       
                                                                )}
                                                        </select>
                                                </div>                                            

                                            </div>

                                            <div className="col col-md-6">

                                                <div className="form-group"> 
                                                    <label className="text-muted">Price</label>
                                                    <input type="number" 
                                                            onChange={handleChange('price')} 
                                                            value={price}
                                                            className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group"> 
                                                    <label className="text-muted">Quantity</label>
                                                    <input type="number" 
                                                            onChange={handleChange('quantity')} 
                                                            value={quantity}
                                                            className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="text-muted">Shipping</label>
                                                    <select
                                                        onChange={handleChange('shipping')} 
                                                        className="form-control"
                                                    >
                                                        <option value="">Select</option>
                                                            <option value="1">Yes</option>
                                                            <option value="0">No</option>

                                                    </select>
                                                </div>
                                           
                                            </div>

                                                {/* Submit Button */}
                                                <div className="col col-md-12 text-center">

                                                <div className="form-group text-left" style={{
                                                    border:'1vh solid #666',
                                                    borderRadius:'1vh',
                                                    padding:'2vh'
                                                }}> 
                                                    <label className="text-muted">Image</label>
                                                    <input type="file"
                                                           onChange={handleChange('image')} 
                                                           accept="image/*"
                                                           name="image"
                                                           className="form-control"
                                                    />
                                                </div>

                                                <button className="btn btn-info" 
                                                            style={{color:'#fff', 
                                                                    backgroundColor:'#009688',
                                                                    width:'80vh'
                                                                    }}
                                                            onClick={handleSubmit}
                                                    >
                                                    Add
                                                    </button>
                                            </div>
                                        </div>
                                    </form>);

    return  <div className="container-fluid">
                {showUploading()}
                {showError()}
                {showSuccess()}
                <div className="card">
                    <h4 className="card-header">Add Product</h4>
                    <div className="card-body">    
                        {addProductForm()}
                    </div>
                </div>
            </div>
}

export default AddProduct;