import React, { FC } from "react";
import styles from "./StyledInput.module.css";

interface StyledButtonProps {
    text : string,
    iconName? : string,
    clickHandler? : () => void
}

const StyledButton : FC<StyledButtonProps> = ({...props}) => {
    return(
        <button className={styles.styledInput} onClick={props.clickHandler}>{props.text}</button>
    );
}

export default StyledButton;