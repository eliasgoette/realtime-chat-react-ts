import React, { FC } from "react";
import styles from "./ChatBubble.module.css";

export type ChatMessage = {
    content : string,
    timestamp : number,
    authorId : string
}

interface ChatBubbleProps {
    message : ChatMessage,
    stickToRight : boolean | null
}

const ChatBubble : FC<ChatBubbleProps> = ({message, stickToRight}) => {
    return(
        <div className={`${styles.chatBubble} ${(stickToRight) ? styles.right : styles.left}`}>
            <p className={styles.content}>{message.content}</p>
            <p className={styles.timestamp}>{new Date(message.timestamp).toLocaleString()}</p>
        </div>
    );
}

export default ChatBubble;