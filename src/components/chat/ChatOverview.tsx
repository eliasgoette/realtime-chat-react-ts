import React, { FC, useState, useEffect } from "react";
import styles from "./ChatOverview.module.css";
import StyledButton from "../generic/inputs/StyledButton";
import database, { push, ref, set, checkValue } from "../../services/database";
import StyledTextBox from "../generic/inputs/StyledTextBox";
import { ChatMessage } from "./ChatBubble";
import ChatTile from "./ChatTile";

export type Chat = {
  id: string;
  name: string;
  messages: ChatMessage[] | null;
}

export type UserData = {
  chats: string[];
  email: string;
  photoUrl: string;
  username: string;
}

interface ChatOverviewProps {
  selectChatHandler: (selectedChatId: string) => void;
}

const ChatOverview: FC<ChatOverviewProps> = ({ selectChatHandler, ...props }) => {
  const [newChatName, setNewChatName] = useState<string>('');
  const [availableChats, setAvailableChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
      const chatRef = ref(database, '/chats');
      checkValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        const chats: Chat[] = data ? Object.keys(data).map(key => ({
          id: key,
          name: data[key].name,
          messages: data[key].messages ? Object.values(data[key].messages) : null
        })) : [];

        setAvailableChats(chats);
      });
  }, []);

  const createChat = () => {
    if (newChatName && newChatName.trim() !== '') {
      const chatRef = ref(database, '/chats');
      const newChatKey = push(chatRef).key;
      if (newChatKey) {
        const newChatData = {
          name: newChatName,
          messages: null
        };

        const newChatRef = ref(database, `/chats/${newChatKey}`);
        set(newChatRef, newChatData).then(() => {
          setNewChatName('');
            const messageRef = push(ref(database, `/chats/${newChatKey}/messages`));
            const message: ChatMessage = {
              content: "Welcome to the chat!",
              authorId: "- Bot",
              timestamp: Date.now()
            }

            set(messageRef, message).catch((error) => {
              console.error(error);
            });
        }).catch((error) => {
          console.error(error);
        });
      }
    }
  };

  const handleSelectedChatChanged = (chat: Chat) => {
    selectChatHandler(chat.id);
    setSelectedChat(chat);
  };

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
          <ChatTile
            chat={chat}
            isSelected={chat.id === (selectedChat?.id ?? '')}
            clickHandler={handleSelectedChatChanged}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatOverview;
