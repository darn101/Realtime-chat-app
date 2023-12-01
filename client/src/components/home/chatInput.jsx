import styled from "styled-components";
import Messages from "./Messages";
import { AiOutlineSend } from "react-icons/ai";
import { FaRegSmileBeam } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from "react";

const ChatInput = ({ HandleSendMsg }) => {
    const [showEmoji, SetShowEmoji] = useState(false);
    const [msg, SetMsg] = useState('');
    const AddEmoji = (e) => {
        let message = msg;
        message += e.emoji;
        SetMsg(message);
    }

    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickedOutside);
    }, [])

    const handleClickedOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            SetShowEmoji(false);
        }
    }

    const SendMessage = () => {
        if (msg !== '') {
            HandleSendMsg(msg);
            SetMsg('');
        }
    }

    const DetectEnter = (e) => {
        if (e.key === 'Enter') {
            SendMessage();
        }
    }
    return (
        <>
            <Container>
                <div className="chat-input">
                    <i className="emoji" onClick={() => SetShowEmoji(!showEmoji)} ref={ref}>
                        <FaRegSmileBeam />
                    </i>
                    {
                        showEmoji &&
                        <div className="emoji-open">
                            <EmojiPicker searchDisabled={true} emojiStyle="native" theme="dark" width={300} height={350} previewConfig={{ showPreview: false }}
                                onEmojiClick={(e) => AddEmoji(e)} />
                        </div>
                    }

                    <div className="right-input" onKeyDown={(e) => DetectEnter(e)}>
                        <div className="msg">
                            <input className="msg-input" type="text" placeholder="Type a message" onChange={(e) => SetMsg(e.target.value)} value={msg} />
                        </div>
                        <span onClick={() => SendMessage()} >
                            <i><AiOutlineSend /></i>
                        </span>
                    </div>
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
color: #fff;
margin-left:1rem;
i{
    color:#fff;
    font-size:1.4rem;
    cursor:pointer;
}
.emoji{
    position:relative;
}
.emoji-open{
    position:absolute;
    bottom:15%;
    .emoji-scroll-wrapper::-webkit-scrollbar{
        background-color:#080420;
        width:5px;
        &-thumb{
            background-color:#9186f3;
        }
    }
}
.right-input{
    display: flex;
    align-items: center;
}
span{
    color:#fff;
    font-size:1.3rem;
    padding:0.5rem;
    margin-top:0.2rem;
    margin-left:0.2rem;
}
.msg-input{
    width:100%;
    background-color:transparent;
    color:#fff;
    height:2.5rem;
    border:1px solid white;
    border-radius:5px;
    padding:0.5rem;
    font-size:1.1rem;
}
.msg{
    width: 94%;
    background-color: #141d26;
}
.chat-input {
    display:grid;
    grid-template-columns: 4% 96%;
    color:#fff;
    align-items: center;
    @media only screen and (min-width: 992px) and (max-width: 1200px){
        grid-template-columns: 6% 94%;
    }
    @media screen and (min-width: 320px) and (max-width: 600px) {
        grid-template-columns: 8% 92%;
    }
}




`

export default ChatInput;