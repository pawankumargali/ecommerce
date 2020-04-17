import React from 'react';
import { Link } from 'react-router-dom';
import ProductImg from './ProductImg';
import Button from '@material-ui/core/Button'

function ProductCard({product}) {
    const {_id, name, description, price} = product;


    return <div className="col col-md-3 mb-3">
                <div className="card" id="product-card">
                    <div className="card-header text-center"><b>{name}</b></div>
                    <div className="card-body">
                        <ProductImg productId={_id} name={name}/>
                        <p>{description.substring(0,100)}
                            <span>{description.length>100 && <Link to='/'>...Read More</Link>}</span>
                        </p>
                        <p><b>Price: {'$'+price}</b></p>
                        <div className="row text-center">
                        <Link to='/'>
                            <Button className="ml-2 mr-2" variant="contained"
                                    style={{fontWeight:'bolder'}}
                            >View Product</Button>
                        </Link>
                        <Link to='/'>
                            <Button className="ml-2 mr-2" variant="contained" color="primary">Add to Cart</Button>
                        </Link>
                        </div>
                    </div>
                </div>
           </div>;
}

export default ProductCard;