import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/generic/Header';
import ChatArea from './components/chat/ChatArea';
import ChatOverview from './components/chat/ChatOverview';
import MessageComposer from './components/chat/MessageComposer';
import { database, push, ref, set } from './services/firebase';
import { ChatMessage } from './components/chat/ChatBubble';
import { User } from 'firebase/auth';
import { getAuthState } from './services/auth';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [selectedChatId, setSelectedChatId] = useState<string>();

  useEffect(() => {
    getAuthState((user) => setCurrentUser(user));
  }, []);

  const onSelectedChatChanged = (selectedChatId : string) => {
    setSelectedChatId(selectedChatId);
  }

  const onSendMessage = (messageContent : string | null) => {
    const chatRef = ref(database, `/chats/${selectedChatId}`);
    const messageRef = push(chatRef);

    if(messageContent) {
      if(currentUser) {
        const messageObject : ChatMessage = {
          content: messageContent,
          authorId: currentUser?.uid,
          timestamp: Date.now()
        }

        set(messageRef, messageObject);
      }
    }
  }

  return (
    <div className="App">
      <AppHeader/>
      <ChatOverview selectChatHandler={onSelectedChatChanged}/>
      {
        (selectedChatId) ?
        <ChatArea chatId={selectedChatId}/>
        : <h2>Please select a chat</h2>
      }
      <MessageComposer sendMessageHandler={onSendMessage}/>
    </div>
  );
}

export default App;
