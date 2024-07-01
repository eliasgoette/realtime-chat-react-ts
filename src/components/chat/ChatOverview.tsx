import React, { FC, useState, useEffect } from "react";
import styles from "./ChatOverview.module.css";
import StyledButton from "../generic/inputs/StyledButton";
import { push, ref, set, onValue } from "firebase/database";
import { database } from "../../services/firebase";
import StyledTextBox from "../generic/inputs/StyledTextBox";
import { ChatMessage } from "./ChatBubble";

interface Chat {
  id : string,
  messages : ChatMessage[] | null
}

const ChatOverview: FC = () => {
  const [newChatName, setNewChatName] = useState<string>('');
  const [availableChats, setAvailableChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chatRef = ref(database, '/chats');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const chats = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      console.log(chats);
      setAvailableChats(chats);
    });
  }, []);

  const createChat = () => {
    const chatRef = ref(database, `/chats/${newChatName}`);
    push(chatRef).then((newChatRef) => {
      const initialChat = {
        0: {
          content: 'Welcome to the chat!',
          timestamp: new Date().toISOString(),
          authorId: 'U1'
        }
      };
  
      set(chatRef, { ...initialChat }).then(() => {
        alert('Chat created!');
        setNewChatName('');
      }).catch((error) => {
        alert(error);
      });
    }).catch(error => {
      alert(error);
    });
  };

  return (
    <div className={styles.chatOverview}>
      <div className={styles.newChat}>
        <StyledTextBox
          placeholder="New chat name"
          value={newChatName}
          valueChangedHandler={e => setNewChatName(e.target.value)}
        />
        <StyledButton text="Create chat" callback={createChat} />
      </div>
      <div className={styles.chatList}>
        {availableChats.map((chat, i) => (
          <div key={i}>{chat.id}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatOverview;
