import { useState } from "react";
import { useHistory, withRouter } from "react-router";

import Input from "../core/Input";
import Button from "../core/Button";
import Textarea from "../core/Textarea";

import { createReferral, getAlertMessage } from "../../services";
import Alert from "../core/Alert";

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState({type: '', message: ''});

    const history = useHistory();

    const handleCreate = () => {
        createReferral(title, description)
        .then((res) => {
            const {rid} = res.data;
            history.push(`/view/${rid}`);
        })
        .catch((e) => {
            setAlert({...alert, type: 'invalid', message: getAlertMessage(e.error)});
        });
    }

    return(
        <div className="form-container">
            <Alert type={alert.type}>{alert.message}</Alert>
            <div className="form-group">
                <div className="form-control">
                    <div className="label">
                        <label>Title</label>
                    </div>
                    <div className="control">
                        <Input 
                            value={title} 
                            className="input-control" 
                            placeholder="enter title here..." 
                            onChangeHandler={setTitle} 
                        />
                    </div>
                </div>
                <div className="form-control">
                    <div className="label">
                        <label>Description</label>
                    </div>
                    <div className="control">
                        <Textarea 
                            value={description} 
                            rows={10}
                            cols={30}
                            className="input-control" 
                            placeholder="enter title here..." 
                            onChangeHandler={setDescription}
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <Button 
                        className="btn btn-success" 
                        onClick={handleCreate}
                        disabled={!title || !description}
                    >Create</Button>
                    <Button 
                        className="btn btn-danger" 
                        onClick={()=> history.push('/dashboard')}
                    >Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Create);