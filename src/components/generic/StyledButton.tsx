import React, { FC } from "react";
import styles from "./StyledButton.module.css";

interface StyledButtonProps {
    text : string,
    iconName? : string,
    callback? : () => void
}

const StyledButton : FC<StyledButtonProps> = ({...props}) => {
    return(
        <button className={styles.styledButton} onClick={props.callback}>{props.text}</button>
    );
}

export default StyledButton;