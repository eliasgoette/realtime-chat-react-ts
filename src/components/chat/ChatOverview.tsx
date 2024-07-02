import React, { FC, useState, useEffect } from "react";
import styles from "./ChatOverview.module.css";
import StyledButton from "../generic/inputs/StyledButton";
import { push, ref, set, onValue } from "firebase/database";
import { database } from "../../services/firebase";
import StyledTextBox from "../generic/inputs/StyledTextBox";
import { ChatMessage } from "./ChatBubble";
import { getAuthState } from "../../services/auth";

interface Chat {
  id : string,
  messages : ChatMessage[] | null
}

interface ChatOverviewProps {
  selectChatHandler : (selectedChatId : string) => void
}

const ChatOverview: FC<ChatOverviewProps> = ({selectChatHandler, ...props}) => {
  const [newChatName, setNewChatName] = useState<string>('');
  const [availableChats, setAvailableChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>();

  useEffect(() => {
    const chatRef = ref(database, '/chats');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const chats = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setAvailableChats(chats);
    });
  }, []);

  const createChat = () => {
    const chatRef = ref(database, `/chats/${newChatName}`);
    push(chatRef).then((newChatRef) => {
      getAuthState((user) => {
        const initialChat = {
          0: {
            content: 'Welcome to the chat!',
            timestamp: new Date().toISOString(),
            authorId: user?.uid ?? 'User undefined'
          }
        };
    
        set(chatRef, { ...initialChat }).then(() => {
          setNewChatName('');
        }).catch((error) => {
          console.error(error);
        });
      });
    }).catch(error => {
      console.error(error);
    });
  };

  const handleSelectedChatChanged = (chat : Chat) => {
    selectChatHandler(chat.id);
    setSelectedChat(chat);
  }

  return (
    <div className={styles.chatOverview}>
      <div className={styles.newChat}>
        <StyledTextBox
          placeholder="New chat name"
          value={newChatName}
          valueChangedHandler={e => setNewChatName(e.target.value)}
        />
        <StyledButton text="Create chat" clickHandler={createChat} />
      </div>
      <h2>Chats</h2>
      <div className={styles.chatList}>
        {availableChats.map((chat, i) => (
          <div className={(selectedChat?.id == chat.id) ? styles.selectedChat : styles.availableChat} key={i} onClick={() => handleSelectedChatChanged(chat)}>{chat.id}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatOverview;
