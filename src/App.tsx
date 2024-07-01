import React from 'react';
import './App.css';
import AppHeader from './components/generic/Header';
import ChatArea from './components/chat/ChatArea';
import ChatOverview from './components/chat/ChatOverview';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <ChatOverview/>
      <ChatArea chatId='ff'/>
    </div>
  );
}

export default App;
