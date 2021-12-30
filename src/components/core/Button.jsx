const Button = (props) => {
    const {
        className,
        onClick,
        disabled,
        style,
        children
    } = props;

    return (
       <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            style={style}
       >{children}</button> 
    );
}

export default Button;