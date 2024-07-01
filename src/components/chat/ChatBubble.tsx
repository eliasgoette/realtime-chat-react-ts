import React, { FC } from "react";
import styles from "./ChatBubble.module.css";

export type chatMessage = {
    content : string,
    timestamp : number,
    authorId : string
}

const ChatBubble : FC<chatMessage> = (message) => {
    return(
        <div className={styles.chatBubble}>
            <p className={styles.content}>{message.content}</p>
            <p className={styles.timestamp}>{message.timestamp}</p>
        </div>
    );
}

export default ChatBubble;