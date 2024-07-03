import React, { FC, useState, useEffect } from "react";
import styles from "./ChatOverview.module.css";
import StyledButton from "../generic/inputs/StyledButton";
import database, { push, ref, set, checkValue } from "../../services/database";
import StyledTextBox from "../generic/inputs/StyledTextBox";
import { ChatMessage } from "./ChatBubble";
import ChatTile from "./ChatTile";
import { User } from "firebase/auth";
import { getAuthState } from "../../services/auth";

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ownedChatIds, setOwnedChatIds] = useState<string[]>([]);
  const [availableChats, setAvailableChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    getAuthState((user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `/users/${currentUser.uid}`);
      checkValue(userRef, (snapshot) => {
        const userData: UserData = snapshot.val();
        const chatIds = userData.chats || [];
        setOwnedChatIds(chatIds);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (ownedChatIds.length > 0) {
      const chatRef = ref(database, '/chats');
      checkValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        const chats: Chat[] = data ? Object.keys(data).map(key => ({
          id: key,
          name: data[key].name,
          messages: data[key].messages ? Object.values(data[key].messages) : null
        })) : [];

        const filteredChats = chats.filter((chat) => ownedChatIds.includes(chat.id));

        setAvailableChats(filteredChats);
      });
    } else {
      setAvailableChats([]);
    }
  }, [ownedChatIds]);

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
          if (currentUser) {
            const userChatsRef = ref(database, `/users/${currentUser.uid}/chats`);
            set(userChatsRef, [...ownedChatIds, newChatKey]);

            const messageRef = push(ref(database, `/chats/${newChatKey}/messages`));
            const message: ChatMessage = {
              content: "Welcome to the chat!",
              authorId: "bot",
              timestamp: Date.now()
            }

            set(messageRef, message).catch((error) => {
              console.error(error);
            });
          }
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
