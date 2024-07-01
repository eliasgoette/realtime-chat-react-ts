import React, { FC } from "react";
import styles from "./StyledButton.module.css";

interface StyledButtonProps {
    text : string,
    iconName? : string
}

const StyledButton : FC<StyledButtonProps> = ({...props}) => {
    return(
        <button className={styles.styledButton}>{props.text}</button>
    );
}

export default StyledButton;