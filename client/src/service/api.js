import axios from 'axios';

const URL = 'https://chat-zone-backend.vercel.app';

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
