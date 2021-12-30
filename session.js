const {v4: uuidv4} = require('uuid');

const sessions = {};

function getSession(sid) {
    return sessions[sid];
}

function isSessionValid(sid){
    return getSession(sid);
}

function createSession(username){
    const sid = uuidv4();
    sessions[sid] = {username};
    return sid;
}

function deleteSesion(sid){
    if(isSessionValid(sid)){
        delete sessions[sid];
    }
}

module.exports =  {
    getSession,
    isSessionValid,
    createSession,
    deleteSesion,
}