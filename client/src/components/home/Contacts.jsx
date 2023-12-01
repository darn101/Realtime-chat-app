import styled from "styled-components";
import { IoPower } from "react-icons/io5";

const Contacts = ({ contacts, currentUser, SelectContact, HandleLogout }) => {
    console.log(contacts);
    console.log(currentUser);
    return (
        <>
            <Container>
                <div className="current-user">
                    {
                        currentUser &&
                        <>
                            <i className="exit" onClick={() => HandleLogout(true)}><IoPower /></i>
                            <div className="currentUser-details">
                                <img src={currentUser.avatarImage} alt="avatar" />
                                <h3>{currentUser.username}</h3>
                            </div>
                        </>
                    }
                </div>
                <div className="contacts">
                    {
                        contacts &&
                        contacts.map((contact, index) => (
                            <div className="each-contact" onClick={() => SelectContact(contact)}>
                                <div className="img-box">
                                    <img src={contact.avatarImage} alt="avatar" key={index} />
                                </div>
                                <h3>{contact.username}</h3>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
.exit{
    display:flex;
    max-width:5rem;
    margin-left:1.5rem;
    font-size:1.6rem;
    &:hover{
        color:#6389FF;
        transform:scale(0.97);
    }
    border:1.8px solid #6382FF;
    border-radius:10rem;
    padding:0.4rem;
    max-height:3rem;
    align-items:center;
    justify-contnet:flex-start;
    cursor:pointer;
    color:#6382FF;
}
background-color: #080420;
display:flex;
flex-direction:column;
overflow:hidden;
font-size:1.3rem;
.contacts{
margin-top:2rem;
margin-bottom:1rem;
display:flex;
flex-direction:column;
gap:1rem;
overflow:auto;
&::-webkit-scrollbar{
    width: 0.2rem;
    &-thumb{
    background-color: #ffffff44;
}
}
}

.current-user{
    color: white;
    background-color:#080420;
    display:flex;
        display:flex;
        align-items:center;
   
    .currentUser-details{
        display:flex;
    align-items:center;
    justify-content:center;
        margin-left:5rem;
    
    }
    
    margin-top:0.1rem;
    img{
        width: 5rem;
       border-radius:50%;
    }
    h3{
        text-transform:uppercase;
    }
}

.each-contact{
    cursor:pointer;
    border-radius:5px;
    color: white;
    background-color: rgba(75,74,74,0.5);
    display:flex;
    align-items:center;
    margin-inline:1rem;
    img{
        height: 7rem;
        width:7rem;
        margin-inline:0.5rem;
    }
    h3{
        text-transform:Capitalize;
    }
    &:hover{
        background-color: rgba(75,74,74,0.6);
    }
}`;

export default Contacts;