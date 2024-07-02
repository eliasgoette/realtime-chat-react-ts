import React, { FC, useEffect, useState } from "react";
import styles from "./ChatArea.module.css";
import ChatBubble, { ChatMessage } from "./ChatBubble";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { database } from "../../services/firebase";
import { User } from "firebase/auth";
import { getAuthState } from "../../services/auth";

interface ChatAreaProps {
    chatId: string;
}

const ChatArea: FC<ChatAreaProps> = ({ chatId, ...props }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        getAuthState((user) => setCurrentUser(user));
    }, []);

    useEffect(() => {
        const messageRef = ref(database, `/chats/${chatId}`);
        const unsubscribe = onValue(messageRef, displayLatestMessages);

        return () => unsubscribe();
    }, [chatId]);

    const displayLatestMessages = (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        const latestMessages: ChatMessage[] = data ? Object.values(data) : [];
        setMessages(latestMessages);
    };

    return (
        <div className={styles.chatArea}>
            {messages.map((m, i) => (
                <ChatBubble
                    message={m}
                    stickToRight={m.authorId === currentUser?.uid}
                    key={i}
                />
            ))}
        </div>
    );
};

export default ChatArea;
