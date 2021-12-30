import ReferralItem from './ReferralItem';

const ReferralList = (props) => {
    const {referrals} = props;

    return(
        <div className="referral-list">
            {referrals.map((referral,key) => <ReferralItem referral={referral} key={key} />)}
        </div>
    );
}

export default ReferralList;