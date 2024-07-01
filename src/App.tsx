import React, { useState } from 'react';
import './App.css';
import AppHeader from './components/generic/Header';
import ChatArea from './components/chat/ChatArea';
import ChatOverview from './components/chat/ChatOverview';
import MessageComposer from './components/chat/MessageComposer';

function App() {
  const [selectedChatId, setSelectedChatId] = useState<string>();

  const onSelectedChatChanged = (selectedChatId : string) => {
    setSelectedChatId(selectedChatId);
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
      <MessageComposer/>
    </div>
  );
}

export default App;
