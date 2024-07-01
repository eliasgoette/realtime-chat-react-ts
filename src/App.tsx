import React from 'react';
import './App.css';
import AppHeader from './components/generic/Header';
import ChatArea from './components/chat/ChatArea';
import StyledButton from './components/generic/StyledButton';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <StyledButton text='Create chat'/>
      <ChatArea chatId='ff'/>
    </div>
  );
}

export default App;
