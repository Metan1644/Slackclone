import React, { useState} from "react";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import {db} from '../firebase';
import firebase from 'firebase';

function ChatInput({channelName, channelId, chatRef}) {
    const [input, setInput] = useState("");
    const sendMessage= (e) =>{
        e.preventDefault();
        if (!channelId){
            return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: 'MT' ,
            userImage:'https://www.adobe.com/express/feature/image/convert/jpg-to-png/media_1b0ad89a4a5ad233f5708e21b5998d6638cb07929.png?width=750&format=png&optimize=medium',
        
        });
        chatRef.current.scrollIntoView({
            behavior: "smooth",
        });

        setInput('');

    };
  return (
    <ChatInputContainer>
        <form>
            <input value={input} 
            onChange={e => setInput(e.target.value)}
            placeholder={`Message #${channelName}`} />
            <Button hidden type='submit' onClick={sendMessage}>
                SEND
            </Button>
        </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
   border-radius:20px;
>form{
    display: flex;
   justify-content: center;
}

>form>input{
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius:3px;
    padding: 20px;
    outline: none;
}

> form > button {
    display: none !important;

}
`;