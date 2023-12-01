import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticateLogin } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const InitialLoginData = {
        firstvalue: '',
        password: '',
    }

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const [loginData, setLoginData] = useState(InitialLoginData);
    const navigate = useNavigate();
    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (HandleValidation()) {
            const res = await AuthenticateLogin(loginData);
            console.log(res);
            if (res.data.status === false) {
                toast.error(res.data.message, toastOptions);
            }
            if (res.data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(res.data.message));
                navigate('/');
            }
        }
    }

    // useEffect(() => {
    //     if (localStorage.getItem('chat-app-user')) {
    //         navigate('/');
    //     }
    // }, [])

    const HandleValidation = () => {
        const { firstvalue, password } = loginData;
        if (firstvalue === "") {
            toast.error("username or email is required", toastOptions);
            return false;
        }
        else if (password === "") {
            toast.error("Password is required", toastOptions);
            return false;
        }
        else if (password.length < 8) {
            toast.error("Password should be of atleast 8 characters", toastOptions);
            return false;
        }
        else if (firstvalue.length < 3) {
            toast.error("Username should be of 3 characters", toastOptions);
            return false;
        }
        return true;
    }


    const HandleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => HandleSubmit(e)}>
                    <div className='brand'>
                        <h1>ChatZone</h1>
                    </div>

                    <input
                        type='text'
                        placeholder='Username/Email'
                        name='firstvalue'
                        onChange={(e) => HandleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={(e) => HandleChange(e)}
                    />
                    <button type='submit'>Login</button>
                    <span>
                        Already have an account? <Link to='/register'>Signup</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
margin-top:3.5rem;
display:flex;
flex-direction:column;
align-items: center;

gap:1rem;
h1{
    color:#FFF;
    font-size:4rem;
    margin-bottom:0.5rem;
}
form{
    display:flex;
    flex-direction: column;
    gap:2rem;
    background-color: #00000276;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
    background-color: transparent;
    color:#FFF;
    font-size:1rem;
    padding: 1rem;
    border : 0.1rem solid #4e0eff;
    border-radius:0.4rem;
    width:100%;
    &:focus{
        border:0.1rem solid #8A86FF;
        outline:none;
        scale:1.01;
    }
}
button {
    cursor:pointer;
    text-align:center;
    background-color: #5500FF;
    color: #FFF;
    font-size:1.3rem;
    padding:1rem;
    outline:none;
    text-transform: uppercase;
    transition : 0ms .5ms ease-in-out;
    border:none;
    &:hover{
        scale:1.01;
        background-color:#4e0eff;
    }
}
span {
    color:#FFF;
    text-transform:uppercase;
    font-size:1rem;
    a{
        color: #4e0eff;
        text-decoration:none;
        font-weigth:bold;
        font-size:1.3rem;
        &:hover{
            scale:1.1;
        }
    }
}
}


}

`;

export default Login;