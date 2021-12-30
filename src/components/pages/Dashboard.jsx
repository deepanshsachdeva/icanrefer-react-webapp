import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { deleteReferral, getReferrals, getAlertMessage } from "../../services";
import Alert from "../core/Alert";
import Button from "../core/Button";

const Dashboard = (props) => {
    const [referrals, setReferrals] = useState([]);
    const [alert, setAlert] = useState({type: '', message: ''});

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        getReferrals('user')
        .then((res) => {
            setReferrals(res.data);
        })
        .catch((e) => {
            setAlert({...alert, type: 'invalid', message: getAlertMessage(e.error)});
        });
    },[]);

    const deleteHandler = (rid) => {
        deleteReferral(rid)
        .then((res) => {
            setReferrals(referrals.filter((referral) => referral.rid !== rid));
        })
        .catch((e) => {
            setAlert({...alert, type: 'invalid', message: getAlertMessage(e.error)});
        })
    }

    return(
        <div className="dashboard-container">
            <Alert type={alert.type}>{alert.message}</Alert>
            <div className="referral-list">
                {(referrals.length > 0) ? referrals.map((referral,key) => 
                    <div key={key} className="referral-item">
                        <div className="header">
                            <h1>{referral.title}</h1>
                            <h5>posted by <i>{referral.createdBy}</i> on {new Date(referral.createdAt).toLocaleDateString("en-US", options)}</h5>
                        </div>
                        <div className="content">
                            <p>{referral.description}</p>
                        </div>
                        <div>
                            <Button 
                                style={{width: '100%'}} 
                                className="btn btn-danger"
                                onClick={() => deleteHandler(referral.rid)}
                            >Delete</Button>
                        </div>
                    </div>
                ) :
                <div className="message"><p>You haven't posted anything yet</p><p>Let's add some!</p></div> }
            </div>
        </div>
    );
}

export default withRouter(Dashboard);