import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'

const socket = io("http://localhost:5000")

const App = () => {
  const [message, setmessage] = useState('') //to store message which user is going to send
  const [chat, setchat] = useState([]) //to store messages sent by all


  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", {message})
    setmessage('')
  }

  useEffect(() => {
    socket.on("chat",(payload) => {
      setchat([...chat, payload])
    })
  })


  return (
    <div className='container'>
      <div className="main">
        <h1>ChattyApp</h1>
        {chat.map((payload, index) => {
          return(
            <p key={index}>{payload.message}</p>
          )
        })}
        <form onSubmit={sendChat}>
          <input type="text" 
            placeholder='send text'
            value={message}
            onChange={(e) => setmessage(e.target.value)}

          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default App
