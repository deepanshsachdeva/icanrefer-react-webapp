import { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { fetchReferral } from "../../services";
import Button from "../core/Button";

const View = (props) => {
    const {rid} = useParams();
    const history = useHistory();

    const [referral, setReferral] = useState({});

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        fetchReferral(rid)
        .then((res) => {
            const {data} = res;
            setReferral({...referral, ...data});
        })
        .catch((err) => {
            //
        });
    },[]);

    return(
        <div className="view-referral-container">
            <div className="header">
                <h2>{referral.title}</h2>
                <h5>posted by <i>{referral.createdBy}</i> on {new Date(referral.createdAt).toLocaleDateString("en-US", options)}</h5>
            </div>
            <div className="content">
                <h4>Description</h4>
                <p>{referral.description}</p>
            </div>
            <div className="actions">
                <Button
                    className="btn" 
                    onClick={() => history.push('/dashboard')}
                >&#10094; Go to Dashboard</Button>
            </div>
        </div>
    );
}

export default withRouter(View);