import React from 'react';
import './App.css';
import AppHeader from './components/generic/Header';
import ChatArea from './components/chat/ChatArea';
import StyledButton from './components/generic/StyledButton';
import database, { ref, set, push } from './services/database';

function App() {
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

  return (
    <div className="App">
      <AppHeader/>
      <StyledButton text='Create chat' callback={createChat}/>
      <ChatArea chatId='ff'/>
    </div>
  );
}

export default App;
