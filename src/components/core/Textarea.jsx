const Textarea = (props) => {
    const {value, rows, cols, className, placeholder, onChangeHandler} = props;

    return (
        <textarea 
            rows={rows}
            cols={cols}
            value={value} 
            className={className} 
            placeholder={placeholder} 
            onChange={(e) => onChangeHandler(e.target.value)}
        />
    );
};

export default Textarea;