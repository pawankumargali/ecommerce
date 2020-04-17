import { API } from '../config';

function addProduct(token, user, product) {
    const fetchOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        },
        body: product
    }
    
    const {_id:userId} = user;

    return fetch(`${API}/product/create/${userId}`, fetchOptions)
                .then(response => response.json())
                .catch(err => console.log(err));
}

function getProducts(sortBy, order='desc', limit=10) {
    return fetch(`${API}/products?sortBy=${sortBy}&order=${order}&limit=${limit}`, {method:'GET'})
                .then(response => response.json())
                .catch(err => console.log(err));
}

function getFilteredProducts(skip, limit, filters) {
    const sortBy='price';
    const fetchOptions = {
        method:'POST',
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({filters:filters})
    }
    return fetch(`${API}/products/by/search?sortBy=${sortBy}&skip=${skip}&limit=${limit}`, 
                  fetchOptions)
                            .then(response => response.json())
                            .catch(err => console.log(err));
}

export { addProduct, getProducts, getFilteredProducts };