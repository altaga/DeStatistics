import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AutoResizingTextArea from "@/app/statistics/components/autoResTextArea";
import { Button } from "@mui/material";
import styles from "./chat.module.css";
import Linkify from "react-linkify";
import runGraph from "@/actions/runGraph";

export default function Chat() {
  // Refs
  const scrollableRef = useRef(null);
  // States
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);

  async function chatPrompt(message) {
    const response = await runGraph(message);
    console.log(response);
    sendMessage(response, true);
  }

  const sendMessage = (message = "", ai = false) => {
    if (!ai) chatPrompt(message);
    let temp = messages;
    temp.push({
      ai,
      timestamp: new Date().getTime(),
      message,
    });
    temp.sort((a, b) => a.timestamp - b.timestamp);
    setMessages(temp);
    setMessage(" ");
    setTimeout(() => {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
      setMessage("");
    }, 50);
  };

  function keyDownHandler(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      setSend(true);
    }
  }

  useEffect(() => {
    if (send) {
      sendMessage(message);
      setSend(false);
    }
  }, [send]);

  useEffect(() => {
    sendMessage("Hello, im DeSmond! How can I help you today?", true);
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={scrollableRef} className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              fontFamily: "monospace",
              whiteSpace: "pre-line",
              fontSize: "1.1rem",
              textAlign: "justify",
              wordBreak: "break-word",
              background: message.ai ? "lightblue" : "lightgreen",
              padding: "20px",
              borderRadius: `${message.ai ? "0" : "20"}px ${
                message.ai ? "20" : "0"
              }px 20px 20px`,
              marginBottom: "20px",
              alignSelf: message.ai ? "flex-start" : "flex-end",
              maxWidth: "70%",
              width: "auto",
            }}
          >
            <Linkify
              properties={{
                target: "_blank",
                style: { fontWeight: "bold" },
              }}
            >
              {message.message}
            </Linkify>
            {message.ai && <br />}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <AutoResizingTextArea
          message={message}
          onChange={(value) => {
            setMessage(value);
          }}
        />
        <Button
          style={{
            margin: "0px 0px 0px 10px",
            aspectRatio: "1",
            height: "auto",
            width: "40px",
            borderRadius: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="contained"
          color="myButton"
          onClick={() => sendMessage(message)}
        >
          <SendIcon style={{ fontSize: "2rem" }} />
        </Button>
      </div>
    </React.Fragment>
  );
}
