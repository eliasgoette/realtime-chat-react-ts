import React, { ChangeEvent, FC, KeyboardEvent } from "react";
import styles from "./StyledInput.module.css";

interface StyledTextBoxProps {
    value : string,
    placeholder : string,
    valueChangedHandler : (event : ChangeEvent<HTMLInputElement>) => void,
    enterKeyHandler? : () => void
}

const StyledTextBox : FC<StyledTextBoxProps> = ({...props}) => {
    const keyDownEvent = (event : KeyboardEvent<HTMLInputElement>) => {
        if(event.key.toLowerCase() === 'enter') {
            if(props.enterKeyHandler) {
                props.enterKeyHandler();
            }
        }
    }

    return(
        <input 
            className={styles.styledInput} 
            type="text" 
            value={props.value} 
            placeholder={props.placeholder} 
            onChange={e => props.valueChangedHandler(e)}
            onKeyDown={e => keyDownEvent(e)}
        />
    );
}

export default StyledTextBox;