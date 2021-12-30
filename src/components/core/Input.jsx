const Input = (props) => {
    const {value, className, placeholder, onChangeHandler} = props;

    return (
        <input 
            type="text" 
            value={value} 
            className={className} 
            placeholder={placeholder} 
            onChange={(e) => onChangeHandler(e.target.value)}
        />
    );
};

export default Input;