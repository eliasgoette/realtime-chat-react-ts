import React, { FC } from "react";
import styles from "./ChatTile.module.css";
import { Chat } from "./ChatOverview";
import { database, ref, remove } from "../../services/firebase";
import StyledButton from "../generic/inputs/StyledButton";

interface ChatTileProps {
    chat: Chat;
    isSelected: boolean;
    clickHandler: (chat: Chat) => void;
}

const ChatTile: FC<ChatTileProps> = ({ chat, isSelected, clickHandler }) => {
    const deleteChat = () => {
        const chatRef = ref(database, `/chats/${chat.id}`);
        remove(chatRef);
    }

    return (
        <div className={isSelected ? styles.selectedChat : styles.availableChat} onClick={() => clickHandler(chat)}>
            <a>{chat.id}</a>
            <StyledButton text="Delete" clickHandler={deleteChat} />
        </div>
    );
}

export default ChatTile;
