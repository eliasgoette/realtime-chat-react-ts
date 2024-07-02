import React, { FC } from "react";
import styles from "./ChatTile.module.css";
import { Chat } from "./ChatOverview";

interface ChatTileProps {
    chat : Chat,
    isSelected : boolean,
    clickHandler : (chat : Chat) => void
}

const ChatTile : FC<ChatTileProps> = ({chat, isSelected, clickHandler}) => {
    return(
        <div className={(isSelected) ? styles.selectedChat : styles.availableChat} onClick={() => clickHandler(chat)}>{chat.id}</div>
    );
}

export default ChatTile;