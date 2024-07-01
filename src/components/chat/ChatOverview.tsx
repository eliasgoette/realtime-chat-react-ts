import React, { FC } from "react";
import styles from "./ChatOverview.module.css";
import StyledButton from "../generic/StyledButton";
import { push, ref, set } from "firebase/database";
import { database } from "../../services/firebase";

const ChatOverview : FC = () => {
    const createChat = () => {
        const chatRef = ref(database, '/chats');
        const newChatRef = push(chatRef);
    
        const initialChat = {
          0: {
            content: 'Welcome to the chat!',
            timestamp: new Date().toISOString(),
            authorId: 'U1'
          }
        };
    
        set(newChatRef, initialChat).then(() => {
          alert('Chat created!');
        }).catch((e) => {
          alert(e);
        });
      }

    return(
        <div>
            <StyledButton text='Create chat' callback={createChat}/>
        </div>
    );
}

export default ChatOverview;