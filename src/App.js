import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import pro from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openAI";
function App() {
  const msgEnd = useRef(null);
  // Scroll to the bottom when messages change
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "hi , I am your assistant", isBot: true },
  ]);
  // useState to manage messages and input
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  // useState to manage sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSidebarOpen &&
        !e.target.closest(".sideBar") &&
        !e.target.closest(".hamburger")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen]);

  //to be changed

  

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (isSidebarOpen && !e.target.closest(".sideBar") && !e.target.closest(".hamburger")) {
      setIsSidebarOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, [isSidebarOpen]);


  // Function to handle sending messages
  const handleSend = async () => {
    setLoading(true);
    const text = input;
    setInput("");
    if (!text.trim()) return; // Prevent sending empty messages
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setLoading(false);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };
  const handleEnter = async (e) => {
    if (e.key === "Enter" && input.trim()) {
      await handleSend();
    }
  }; // this function is not used but can be used to send message on enter key press
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperside">
          <div className="uppersideTop">
            <img src={gptLogo} alt="Logo" className="logo" />{" "}
            <span className="brand">Chat GPT</span>
          </div>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="Btn"
          >
            <img src={addBtn} alt="addBtn" className="addBtn" />
            New Chat
          </button>
          <div className="uppersideBtn">
            <button
              className="query"
              onClick={() => {
                setInput("what is Programming");
              }}
            >
              <img src={msgIcon} alt="msgIcon" className="msgIcon" />
              what is Programming ?
            </button>

            <button
              className="query"
              onClick={() => {
                setInput("How to use API ?");
              }}
            >
              <img src={msgIcon} alt="msgIcon" className="msgIcon" />
              How to use API ?
            </button>
            <button
              className="query"
              onClick={() => {
                setInput("Tell me about Debjyoti");
              }}
            >
              <img src={msgIcon} alt="msgIcon" className="msgIcon" />
              Tell me about Debjyoti
            </button>
            <button
              className="query"
              onClick={() => {
                setInput("who is Debjyoti's Wife?");
              }}
            >
              <img src={msgIcon} alt="msgIcon" className="msgIcon" />
              who is Debjyoti's Wife?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="home" className="home" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="saved" className="saved" />
            Saved
          </div>
          <div className="listItems">
            <img src={pro} alt="pro" className="pro" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
 
        <div className="chats">
          {messages.map((message, i) => (
            <div className={message.isBot ? "chat bot" : "chat"} key={i}>
              <img src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          {loading && (
            <div className="chat">
              <img src={gptImgLogo} alt="GPT" />
              <div className="typing">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message ..."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="sendBtn" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
// this is changed code
// this is the code for the chat application using React
