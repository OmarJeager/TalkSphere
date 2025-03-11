// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let key in data) {
        loadedMessages.push({ id: key, text: data[key].text });
      }
      setMessages(loadedMessages);
    });
  }, []);

  const sendMessage = () => {
    const messagesRef = ref(db, 'messages');
    const newMessage = push(messagesRef);
    set(newMessage, {
      sender: auth.currentUser.email,
      text: message,
    });
    setMessage('');
  };

  return (
    <div>
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id}>
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
