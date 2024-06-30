import React, { FC } from "react";
import styles from "./ChatArea.module.css";
import ChatBubble, { chatMessage } from "./ChatBubble";

const ChatArea : FC = () => {
    let messages : chatMessage[] = [
        {
            content: "Foo",
            timestamp: Date.now() - 8,
            authorUid: "U1"
        },
        {
            content: "Bar",
            timestamp: Date.now() - 7,
            authorUid: "U2"
        },
        {
            content: "Whatevs",
            timestamp: Date.now() - 6,
            authorUid: "U1"
        },
        {
            content: "Check",
            timestamp: Date.now() - 5,
            authorUid: "U2"
        },
        {
            content: "It out",
            timestamp: Date.now() - 4,
            authorUid: "U1"
        },
        {
            content: "Bar",
            timestamp: Date.now() - 3,
            authorUid: "U2"
        },
        {
            content: "Whatevs",
            timestamp: Date.now() - 2,
            authorUid: "U1"
        },
        {
            content: "Check",
            timestamp: Date.now() - 1,
            authorUid: "U2"
        },
        {
            content: "It out",
            timestamp: Date.now(),
            authorUid: "U1"
        }
    ];

    return(
        <div className={styles.chatArea}>
            {messages.map(m => <ChatBubble {...m}/>)}
        </div>
    );
}

export default ChatArea;