import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ProductCard from './ProductCard';
import { getProducts } from '../../apiMethods/product';

function SignUp() {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold')
                .then( data => {
                    if(data.err)
                        setError(data.err);
                    else 
                        setProductsBySell(data);
                });
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt')
                .then(data => {
                    if(data.err)
                        setError(data.err);
                    else
                        setProductsByArrival(data);
                })
    }

    useEffect(() => {
        loadProductsBySell();
        loadProductsByArrival();
    }, [])

    const showError = () => <div className="text-danger">{error}</div>

    return  <Layout title="Home" description="Node React e-commerce App" className="container">
                {showError()}
                <h3 className="text-center">Best Sellers</h3>
                <div className="row">
                    {productsBySell.map( (product, index) => <ProductCard key={index} product={product}/>)}
                </div>
                <h3 className="text-center">New Arrivals</h3>
                <div className="row">
                    {productsByArrival.map( (product, index) => <ProductCard key={index} product={product}/>)}
                </div>
            </Layout>;
}

export default SignUp;