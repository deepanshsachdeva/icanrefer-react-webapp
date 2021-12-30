const express = require('express');
const cookieParser = require('cookie-parser');
const {v4: uuidv4} = require('uuid');
const app = express();
const PORT = 3000;

app.use(express.static('./build'));
app.use(cookieParser());

const state = require('./state');
const utility = require('./utility');
const sessionUtility = require('./session');

const checkCookie = (req, res, next) => {
    const sid = req.cookies.sid

	if(!sid){
		res.status(401).json({error: 'login-required'});
		return;
	}

    if(!sessionUtility.isSessionValid(sid)){
        res.status(403).json({ error: 'login-invalid'});
        return;
    }

    next();
};

app.get('/api/session', checkCookie, (req,res) => {
	const sid = req.cookies.sid
    const session = sessionUtility.getSession(sid);
    res.status(200).json({
		data: {
			id: sid,
			username: session.username
		}
	});
});

app.post('/api/session', express.json(), (req,res) => {
	const { usernameInput } = req.body;

	const username = utility.sanitizeInput(usernameInput);

	if(!username){
		res.status(422).json({error: 'username-required'});
		return;
	}

	if(!utility.isUsernameValid(username)){
		res.status(400).json({error: 'username-invalid'});
		return;
	}

	const sid = sessionUtility.createSession(username);
	const session = sessionUtility.getSession(sid);

	res.cookie('sid', sid);
	res.status(200).json({
		data: {
			id: sid,
			username: session.username
		}
	});
});

app.delete('/api/session', checkCookie, (req,res)=>{
	const sid = req.cookies.sid
	
    sessionUtility.deleteSesion(sid);
    res.clearCookie('sid');
    res.status(200).json('logout');
});

app.get(`/api/referrals`, (req,res) => {
	let type = req.query.type

	const sid = req.cookies.sid;

	if(type === 'user' && !sessionUtility.isSessionValid(sid)){
		type = 'all';
	}

	const session = sessionUtility.getSession(sid);

	const {referrals} = state;

	const sorter = (x,y) => y.createdAt-x.createdAt;

	res.status(200).json({
		data: (type === 'user') ? referrals.filter((referral) => referral.createdBy === session.username).sort(sorter) : referrals.sort(sorter)
	});
});

app.get(`/api/referrals/:rid`, checkCookie, (req,res) => {
	const {rid} = req.params;

	const {referrals} = state;

	const referral = referrals.find((referral) => referral.rid === rid);

	if(referral){
		res.status(200).json({
			data: referral
		});
		return;
	}

	res.status(404).json({});
});

app.delete(`/api/referrals/:rid`, checkCookie, (req,res) => {
	const {rid} = req.params;

	const {referrals} = state;

	const ix = referrals.findIndex((referral) => referral.rid === rid);

	if(ix >= 0){
		if(referrals[ix].rid !== rid){
			res.status(400).json({error: 'cannot-delete'});
			return;
		}

		referrals.splice(ix,1);
		res.status(200).json({});
		return;
	}

	res.status(404).json({});
});

app.post(`/api/referrals`, [checkCookie, express.json()], (req,res) => {
	const {titleInput, descriptionInput} = req.body;

	const title = utility.sanitizeInput(titleInput);

	if(!title){
		res.status(422).json({error: 'title-required'});
		return;
	}

	const description = utility.sanitizeInput(descriptionInput);

	if(!description){
		res.status(422).json({error: 'description-required'});
		return;
	}

	const session = sessionUtility.getSession(req.cookies.sid);

	const referral = {
		rid: uuidv4(),
		title: title,
		description: description,
		createdBy: session.username,
		createdAt: Date.now()
	}

	state.referrals.push(referral);

	res.status(200).json({
		data: referral
	});
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));