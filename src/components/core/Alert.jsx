const Alert = (props) => {
    const {
        type,
        children
    } = props;

    return (
        <div className="alert-container">
            <p className={`error-message ${type}-feedback`}>{children}</p>
        </div>
    );
}

export default Alert;