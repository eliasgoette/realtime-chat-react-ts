import React, { FC } from "react";
import styles from "./Header.module.css";

const AppHeader : FC = () => {
    return (
        <header className={styles.header}>
            <h1>RT Chat</h1>
        </header>
    );
}

export default AppHeader;