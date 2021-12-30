import { useEffect, useState } from "react";
import { getReferrals } from "../../services";

import ReferralList from '../ReferralList';

const Home = (props) => {
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
        getReferrals()
        .then((res) => {
            const {data} = res;
            setReferrals(data);
        })
        .catch((err) => {
            //
        });
    },[]);

    return(
        (referrals.length > 0 ) 
        ? <ReferralList referrals={referrals} /> 
        : <div className="message"><p>Nothing is available yet</p></div>
    );
}

export default Home;