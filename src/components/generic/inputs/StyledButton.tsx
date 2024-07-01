import React, { FC } from "react";
import styles from "./StyledInput.module.css";

interface StyledButtonProps {
    text : string,
    iconName? : string,
    callback? : () => void
}

const StyledButton : FC<StyledButtonProps> = ({...props}) => {
    return(
        <button className={styles.styledInput} onClick={props.callback}>{props.text}</button>
    );
}

export default StyledButton;