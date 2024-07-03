import React, { FC, useState } from "react";
import styles from "./MessageComposer.module.css";
import StyledTextBox from "../generic/inputs/StyledTextBox";
import StyledButton from "../generic/inputs/StyledButton";


interface MessageComposerProps {
    sendMessageHandler : (message : string | null) => void
}


const MessageComposer : FC<MessageComposerProps> = ({sendMessageHandler}) => {
    const [message, setMessage] = useState<string | null>(null);

    const sendMessage = () => {
        sendMessageHandler(message);
        setMessage(null);
    }

    return(
        <div className={styles.messageComposer}>
            <StyledTextBox value={message ?? ''} placeholder="Message" valueChangedHandler={(e) => setMessage(e.target.value)}/>
            <StyledButton text="Send" clickHandler={sendMessage}/>
        </div>
    );
}

export default MessageComposer;