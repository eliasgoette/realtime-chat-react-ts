import React, { FC } from "react";
import styles from "./MessageComposer.module.css";
import StyledTextBox from "../generic/inputs/StyledTextBox";
import StyledButton from "../generic/inputs/StyledButton";



// TODO: Add logic to send messages


const MessageComposer : FC = () => {
    return(
        <div className={styles.messageComposer}>
            <StyledTextBox value="" placeholder="Message" valueChangedHandler={() => {}}/>
            <StyledButton text="Send"/>
        </div>
    );
}

export default MessageComposer;