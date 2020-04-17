import { API } from '../config';

function signUp(user) {
    const fetchOptions = {
                            method:'POST',
                            headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(user)
                         };

    return fetch(`${API}/auth/signup`, fetchOptions).then(response => response.json())
                                                    .catch(err => console.log(err));
}

function signIn(user) {
    const fetchOptions = {
                            method:'POST',
                            headers: {
                                        'Accept':'application/json',
                                        'Content-Type':'application/json'
                            },
                            body: JSON.stringify(user)
                         }
    return fetch(`${API}/auth/signin`, fetchOptions).then(response => response.json())
                                                    .catch(err => console.log(err));
}

function setToken(data, next) {
    if(typeof window !== undefined) { 
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

function signOut(next) {
    if(typeof window !== undefined) {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/auth/signout`, {method:'GET'})
                    .then(response => response.json() )
                    .catch(err => err);
    }
}

function isAuthenticated() {
    if(typeof window === undefined) 
        return false;
    const auth = localStorage.getItem('jwt');
    if(!auth)
        return false;
    return JSON.parse(auth);
}

function isAdmin() {
    if(isAuthenticated()) {
        const {user: {role } } = isAuthenticated();
        if(role===1)
            return  true;
    }
    return false;
}
  
export { signUp, signIn, setToken, signOut, isAuthenticated, isAdmin };