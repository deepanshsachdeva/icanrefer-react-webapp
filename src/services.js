function handleResponse(response){
    if(response.ok) {
        return response.json();
    }

    return response.json().then( err => Promise.reject(err) );
}

const fetchSession = () => {
    return fetch(`/api/session`,  {
        method: 'GET',
      })
    .catch(() => Promise.reject({ error: 'network-error'} ))
    .then(response => {
        return handleResponse(response);
    });
};

const createSession = (usernameInput) => {
    return fetch(`/api/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usernameInput }),
    })
    .catch( () => {
        return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
        return handleResponse(response);
    });
}

const deleteSession = () => {
    return fetch(`/api/session`,  {
        method: 'DELETE',
      })
    .catch(() => Promise.reject({ error: 'network-error'} ))
    .then(response => {
        return handleResponse(response);
    });
};

const getReferrals = (type) => {
    return fetch(`/api/referrals?type=${(type === 'user')?'user':'all'}`,  {
        method: 'GET',
      })
    .catch(() => Promise.reject({ error: 'network-error'} ))
    .then(response => {
        return handleResponse(response);
    });
};

const fetchReferral = (rid) => {
    return fetch(`/api/referrals/${rid}`,  {
        method: 'GET',
      })
    .catch(() => Promise.reject({ error: 'network-error'} ))
    .then(response => {
        return handleResponse(response);
    });
};

const deleteReferral = (rid) => {
    return fetch(`/api/referrals/${rid}`,  {
        method: 'DELETE',
      })
    .catch(() => Promise.reject({ error: 'network-error'} ))
    .then(response => {
        return handleResponse(response);
    });
};

const createReferral = (titleInput, descriptionInput) => {
    return fetch(`/api/referrals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            titleInput, 
            descriptionInput
        }),
    })
    .catch( () => {
        return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
        return handleResponse(response);
    });
}

const getAlertMessage = (error) => {
    const errorMessages = {
        'network-error': 'There was a problem connecting to the network. Try again!',
        'title-required': 'Title is required',
        'description-required': 'Description is required',
        'username-required': 'Username is required',
        'username-invalid': 'Username is not allowed',
        'login-required': 'You are not authorized to use the application',
        'login-invalid': 'Session is invalid',
    }

    return errorMessages[error] ? errorMessages[error] : "Oops! Something went wrong.";
}

module.exports = {
    fetchSession,
    createSession,
    deleteSession,
    getReferrals,
    fetchReferral,
    createReferral,
    deleteReferral,
    getAlertMessage,
};