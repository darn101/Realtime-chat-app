import { useNavigate } from "react-router-dom";
import { loading } from '../../assets/loading.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
const SetAvatar = () => {
    const SetAvatarRoute = 'https://chat-zone-five.vercel.app/api/auth/setAvatar';
    const avatars = [
        { src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Precious" },
        { src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy" },
        { src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Missy" },
        { src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Max" },
        { src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tigger" },
        { src: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mia" },
        { src: " https://api.dicebear.com/7.x/adventurer/svg?seed=Mittens" }
    ]

    console.log(avatars);
    const navigate = useNavigate();
    const [isLoading, SetisLoading] = useState(true);
    const [SelectedAvatar, SetSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const [isSelected, SetIsSelected] = useState(false);

    const SetProfilePic = async () => {


        if (SelectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
            return;
        }
        else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            console.log(user);
            console.log(SelectedAvatar);
            const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
                avatarImage: SelectedAvatar
            });
            console.log(data);
            if (data.isAvatarImageSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.avatarImage;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            }
            else {
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        }

    }

    return (<>
        <Container>
            <div className="full-box">
                <h2>Choose your avatar</h2>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <>
                                    <img src={avatar.src} alt={avatar} className={avatar.src === SelectedAvatar ? 'selected' : ''} onClick={() => { SetSelectedAvatar(avatar.src); SetIsSelected(true); }} />
                                </>
                            )
                        })
                    }
                </div>
                <button onClick={() => SetProfilePic()}>Set as Profile Picture</button>
            </div>
        </Container>
        <ToastContainer />
    </>);
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items:center;
height:100vh;
color: #FFF;
.full-box {
    display:flex;
    flex-direction:column;
    align-items: center;
}
h2{
    font-size: 2.5rem;
}
img{
    width: 10rem;
    height:10rem;
    border: 0.1rem solid #FFF;
    border-radius: 5rem;
    padding:1rem;
    cursor:pointer;
    transition: 0.2s ease-in-out;
    &:hover{
        border: 0.5rem solid #006FFF;
    }
}
.avatars {
    display:flex;
    gap:2rem;
    margin-top:3rem;
}
button {
    margin-top:2rem;
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
.selected {

    border: 0.5rem solid #006FFF;
}
`;

export default SetAvatar;


