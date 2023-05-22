import React from "react";
import '../Styles/Components/Button.scss';

type ButtonProps ={
    onButtonClick?: () => void;
    children: JSX.Element | string;
    variant?: "primary" | "secondary";
    type?: "button" | "submit";
}
export const Button = ({onButtonClick, children, variant="primary"}: ButtonProps) => {
    return <button className= {`button ${variant}`} onClick={() => onButtonClick?.()}>{children}</button>
}