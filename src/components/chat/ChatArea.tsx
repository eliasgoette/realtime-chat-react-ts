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

interface ChatMessageWithID extends ChatMessage {
    id: string;
}

const ChatArea: FC<ChatAreaProps> = ({ chatId }) => {
    const [messages, setMessages] = useState<ChatMessageWithID[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        getAuthState((user) => setCurrentUser(user));
    }, []);

    useEffect(() => {
        const messageRef = ref(database, `/chats/${chatId}/messages`);
        const unsubscribe = onValue(messageRef, displayLatestMessages);

        return () => unsubscribe();
    }, [chatId]);

    const displayLatestMessages = (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        const latestMessages: ChatMessageWithID[] = data
            ? Object.keys(data).map(id => ({ id: id, ...data[id] }))
            : [];
        setMessages(latestMessages);

        setTimeout(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }, 200);
    };

    return (
        <div className={styles.chatArea}>
            {messages.map((m, i) => (
                <ChatBubble
                    message={m}
                    stickToRight={m.authorId === currentUser?.uid}
                    isLastInGroup={messages[i + 1]?.authorId !== m.authorId && messages.length > i}
                    key={m.id}
                />
            ))}
        </div>
    );
};

export default ChatArea;
