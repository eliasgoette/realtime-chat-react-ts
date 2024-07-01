import React, { ChangeEvent, FC } from "react";
import styles from "./StyledInput.module.css";

interface StyledTextBoxProps {
    value : string,
    placeholder : string,
    valueChangedHandler : (event : ChangeEvent<HTMLInputElement>) => void
}

const StyledTextBox : FC<StyledTextBoxProps> = ({...props}) => {
    return(
        <input className={styles.styledInput} type="text" value={props.value} placeholder={props.placeholder} onChange={e => props.valueChangedHandler(e)}/>
    );
}

export default StyledTextBox;