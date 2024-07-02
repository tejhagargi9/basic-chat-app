import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io("http://localhost:5000");

const App = () => {
  const [message, setmessage] = useState(''); // to store message which user is going to send
  const [chat, setchat] = useState([]); // to store messages sent by all

  const sendChat = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleTimeString(); // Get the current time as a string
    socket.emit("chat", { id: nanoid(), message, timestamp });
    setmessage('');
  };

  //emit is used to push message
  //on is used to listen 

  useEffect(() => {
    socket.on("chat", (payload) => {
      setchat(prevChat => [...prevChat, payload]);
    });

    // Cleanup on unmount
    return () => socket.off("chat");
  }, []);

  return (
    <div className='container'>
      <div className="main">
        <h1>ChattyApp</h1>
        {chat.map((payload) => (
          <p key={payload.id}>
            <span>{payload.timestamp}:</span>{payload.message}
          </p>
        ))}
        <form onSubmit={sendChat}>
          <input 
            type="text" 
            placeholder='send text'
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default App;
