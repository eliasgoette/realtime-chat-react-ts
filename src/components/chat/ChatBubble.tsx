import React, { FC, useEffect, useState } from "react";
import styles from "./ChatBubble.module.css";
import database, { checkValue, ref } from "../../services/database";
import { onValue } from "firebase/database";

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
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const authorId = message.authorId;
        onValue(ref(database, `/users/${authorId}`), (snapshot) => {
            setUsername((snapshot.val() && snapshot.val().username) || authorId);
        }, {
            onlyOnce: true
        });
    }, []);

    return(
        <div className={`${styles.chatBubble} ${(stickToRight) ? styles.right : styles.left}`}>
            <p className={styles.content}>{message.content}</p>
            <p className={styles.information}>{username}</p>
            <p className={styles.information}>{new Date(message.timestamp).toLocaleString()}</p>
        </div>
    );
}

export default ChatBubble;