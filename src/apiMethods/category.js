import { API } from '../config';

function createCategory(token, user, catName) {

    const fetchOptions = {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body: JSON.stringify({name:catName})
    }

    const { _id:userId } = user;

    fetch(`${API}/category/create/${userId}`, fetchOptions)
            .then(response => response.json())
            .catch(err => console.log(err));
}


function getCategories() {
    return fetch( `${API}/categories`, { method:'GET' } )
                .then(response => response.json())
                .catch(err => console.log(err));
}

export { createCategory, getCategories };
