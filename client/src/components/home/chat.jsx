import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contacts from "./Contacts";
import Texts from "./Texts";
import { io } from "socket.io-client";


const Chat = () => {

    const socket = useRef(null);
    const navigate = useNavigate();
    const [contacts, SetContacts] = useState(null);
    const [currentUser, SetCurrentUser] = useState(null);
    const [currentChat, SetCurrentChat] = useState(null);
    const [LogoutFinal, SetLogoutFinal] = useState(false);

    const SelectContact = (data) => {
        SetCurrentChat(data);
    }

    const HandleLogout = (value) => {
        SetLogoutFinal(value);
    }

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login')
        }
        else {
            (
                async () => {
                    SetCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
                    console.log(currentUser);
                }
            )();
        }

    }, [])


    useEffect(() => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                (async () => {
                    console.log('hello');
                    const { data } = await axios.get(`http://localhost:8000/api/auth/getAllusers/${currentUser._id}`);
                    console.log(data);
                    SetContacts(data);
                    console.log(contacts);
                })();

            }
            else {
                navigate('/setAvatar');
            }
        }
    }, [currentUser])

    useEffect(() => {
        if (currentUser) {
            socket.current = io('http://localhost:8000');
            socket.current.emit("add-user", currentUser._id);
            console.log(currentUser._id);
        }
    }, [currentUser])

    return (
        <>
            <Container>
                <div className="container">
                    <Contacts contacts={contacts} currentUser={currentUser} SelectContact={SelectContact} HandleLogout={HandleLogout} />
                    <Texts currentChat={currentChat} currentUser={currentUser} socket={socket} SelectContact={SelectContact} />
                    {
                        LogoutFinal && (
                            <div className="modal">
                                <div className="overlay" onClick={() => {
                                    SetLogoutFinal(false);
                                }}>
                                    <div className="modal-content">
                                        <h2>Are you sure you want to logout?</h2>
                                        <div className="btns">
                                            <button
                                                className="yes"
                                                onClick={() => {
                                                    localStorage.removeItem('chat-app-user');
                                                    navigate('/login');
                                                }}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="no"
                                                onClick={() => {
                                                    SetLogoutFinal(false);
                                                }}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Container>
        </>
    );
}


const Container = styled.div`
h2{
    display:flex;
    align-items:center;
    justify-content:center;
}

.btns{
    display:flex;
    align-items:center;
    justify-content:center;
    
}

button{
    margin-top:1rem;
    font-size:1.5rem;
    padding: 0.05rem 1rem;
    margin-right:2rem;
    font-weight:700;
    cursor:pointer;
    border-radius:0.5rem;
    &:hover{
        transform:scale(1.02);
    }
}

.modal, .overlay {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
}

.overlay {
    background: rgba(49,49,49,0.6);
}

.modal-content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background-color: #414141;
    color:#fff;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 600px;
    min-width: 300px;
}

.container {
    display:grid;
    grid-template-columns: 30% 70%;
    background-color:#000;
    height:90vh;
    margin:2.5rem 5rem 0rem 5rem;
    padding-bottom:0rem;
    @media only screen and (min-width: 992px) and (max-width: 1200px) {
        grid-template-columns: 40% 60%;
        margin: 2rem 1rem 0rem 1rem;
    }
    @media only screen and (min-width: 600px) and (max-width: 1024px) {
        grid-template-columns: 100%;
        margin: 2rem 1rem 0rem 1rem;
    }
    @media screen and (min-width: 320px) and (max-width: 600px) {
        grid-template-columns: 100%;
        margin: 2rem 1rem 0rem 1rem;
    }
}
`
export default Chat;