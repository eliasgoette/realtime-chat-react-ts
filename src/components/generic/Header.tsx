import React, { FC } from "react";
import styles from "./Header.module.css";
import AccountCircle from "./AccountCircle";

const AppHeader : FC = () => {
    return (
        <header className={styles.header}>
            <h1>RT Chat</h1>
            <AccountCircle/>
        </header>
    );
}

export default AppHeader;