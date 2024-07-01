import React, { useState } from 'react';
import './App.css';
import AppHeader from './components/generic/Header';
import ChatArea from './components/chat/ChatArea';
import ChatOverview from './components/chat/ChatOverview';

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
        : <></>
      }
    </div>
  );
}

export default App;
