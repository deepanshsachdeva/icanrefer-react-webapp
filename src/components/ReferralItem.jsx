const ReferralItem = (props) => {
    const {referral} = props;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return(
        <div className="referral-item">
            <div className="header">
                <h1>{referral.title}</h1>
                <h5>posted by <i>{referral.createdBy}</i> on {new Date(referral.createdAt).toLocaleDateString("en-US", options) }</h5>
            </div>
            <div className="content">
                <p>{referral.description}</p>
            </div>
        </div>
    );
}

export default ReferralItem;