import axios from 'axios';

const URL = 'http://localhost:8000';

export const AuthenticateSignUp = async (data) => {
    try {
        return await axios.post(`${URL}/api/auth/signup`, data);
    }

    catch (err) {
        console.log(err);
    }
}

export const AuthenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/api/auth/login`, data);
    }

    catch (err) {
        console.log(err);
    }
}
