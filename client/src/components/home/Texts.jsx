import styled from "styled-components";
import ChatInput from "./chatInput";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { IoArrowBack } from "react-icons/io5";

const Texts = ({ currentChat, socket, SelectContact }) => {
    console.log(socket);
    console.log(currentChat);
    const [sendMsg, SetSendMsg] = useState("");
    const [messages, SetMessages] = useState([]);
    const [arrivalMsg, SetArrivalMsg] = useState(null);
    const scrollRef = useRef(null);

    const currentUser = JSON.parse(localStorage.getItem("chat-app-user"));

    const MoveBack = () => {
        SelectContact(null);
    }

    useEffect(() => {
        (async () => {
            await getChat();
        })();
        return () => {

        }

    }, [currentChat, messages]);

    const getChat = async () => {
        if (currentChat) {
            const response = await axios.post(`https://chat-zone-backend.vercel.app/api/message/getmsg`, {
                from: currentUser._id,
                to: currentChat._id
            });
            SetMessages(response.data.projectedMessages);
        }
    }

    const HandleSendMsg = async (msg) => {
        await axios.post(`https://chat-zone-backend.vercel.app/api/message/addmsg`, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        socket.current.emit("send-msg", {
            to: currentUser._id,
            from: currentChat._id,
            message: msg
        })
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        SetMessages(msgs);
    }


    useEffect(() => {
        if (socket.current) {
            console.log(socket.current);
            socket.current.on("msg-recieve", (msg) => {
                SetArrivalMsg({ fromSelf: false, message: msg });
            })
        }
    }, [])

    useEffect(() => {
        arrivalMsg && SetMessages((prev) => [...prev, arrivalMsg]);
        console.log(arrivalMsg);
    }, [arrivalMsg])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages])

    return (
        <>
            <Container>

                {
                    currentChat &&
                    <>
                        <div className="chat-box">

                            <div className="chat-head">
                                <i className="back-btn" onClick={() => MoveBack()}><IoArrowBack /></i>
                                <img src={currentChat.avatarImage} alt="avatar" />
                                <h3>{currentChat.username}</h3>
                            </div>
                            <div className="chat-portion">
                                {
                                    messages.length > 0 &&

                                    messages.map((msg, index) => {
                                        console.log('bc');
                                        return (
                                            <div ref={scrollRef} key={uuidv4()}>
                                                <div className={`message ${msg.fromSelf ? "sended" : "recieved"}`}>
                                                    <div className="content">
                                                        <p>{msg.message.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <ChatInput HandleSendMsg={HandleSendMsg} />

                        </div>
                    </>
                }

            </Container>
        </>
    );
}

const Container = styled.div`

.back-btn{
    display:none;
    margin-left:0.5rem;
    font-size:1.7rem;
    cursor:pointer;
    @media only screen and (max-width: 1024px){
        display:block;
    }
}

.chat-box{
    height:90vh;
    display:grid;
    grid-template-rows:10% 80% 10%;
}
.chat-portion{
    width:100%;
    font-size:1.2rem;
    margin:1rem 0.5rem;
    overflow:auto;
    &::-webkit-scrollbar{
        width:0.4rem;
        
        &-thumb{
            background-color: rgba(75,74,74,0.6);
            cursor:pointer;
            
        }
    }
}

.message{
    display:flex;
    margin-inline:1rem;
}

.sended{
    justify-content:flex-end;
}

.recieved{
    justify-content:flex-start;
}

.content{ 
    padding:0.5rem 0.8rem;
    margin:0.5rem 0.5rem;
    background-color: rgba(75,74,74,0.6);
    width:fit-content;
    border-radius:8px;
    display:flex;
    
    p{
        color:#FFF;
    }    
    font-size:1.3rem;    
}

.chat-head{
    display: flex;
    align-items: center;
    background-color: rgba(75,74,74,0.6);
    color:#FFF;
    text-transform:capitalize;
    gap:0.5rem;
    font-size:1.3rem;
    img{
        width: 5rem;
        margin-top:0.5rem;
        margin-left: 0.5rem;
    }
}
`

export default Texts;