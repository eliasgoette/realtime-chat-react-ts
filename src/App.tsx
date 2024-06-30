import React from 'react';
import './App.css';
import AppHeader from './components/generic/Header';
import ChatArea from './components/chat/ChatArea';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <ChatArea/>
    </div>
  );
}

export default App;
