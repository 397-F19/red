const express = require('express');

// initialize fire base dependencies & secret
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const bodyParser = require('body-parser');

const serviceAccount = {
	apiKey: 'AIzaSyCcqThTsn5RFIkWoDfbM8iI8ikRG59PP-U',
	authDomain: 'meetme-3e373.firebaseapp.com',
	databaseURL: 'https://meetme-3e373.firebaseio.com',
	projectId: 'meetme-3e373',
	storageBucket: 'meetme-3e373.appspot.com',
	messagingSenderId: '1016155699277',
	appId: '1:1016155699277:web:a439fafce586e1ef794404'
};

// firebase initialization
firebase.initializeApp(serviceAccount);
var db = firebase.database();
const port = process.env.PORT || 5000;
const app = express();

// Setting up middleware for retrieving data from front-end
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a new user with username, no password needed at this time
app.post('/create/user', async (req, res) => {
	try {
		const { uid, name, email } = req.body;
		let postData = {
			[uid]: {
				name : name,
				email: email
			}
		};
		let response = {
			uid: uid
		};
		var ref = db.ref('/data/users');
		await ref.update(postData);
		res.send(response);
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});


// DEPRECATED:
//
// app.post('/create/user', async (req, res) => {
// 	try {
// 		const { username } = req.body;
// 		let userID = makeid();
// 		let postData = {
// 			[username]: {
// 				user_id : userID
// 			}
// 		};
// 		var ref = db.ref('/data/users');
// 		await ref.update(postData);
// 		res.send('success');
// 	} catch (e) {
// 		res.sendStatus(400).send(e);
// 	}
// });

// to front-end
app.post('/create/event', async (req, res) => {
	try {
		const { location, title, time, attendees, desc, username } = req.body;
		let eventID = makeid();
		const eventsRef = db.ref('/data/events');
		// const userRef = db.ref(`/data/users/${username}/events`);
		// var eventsSnapshot = await userRef.once('value');
		let eventsData = {
			[eventID] : {
				owner: username,
				title: title,
				desc: desc,
				location: location,
				time: time,
				attendees: attendees
			}
		};
		await eventsRef.update(eventsData);
		res.send('success');
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// delete an event
app.post('/delete/event', async (req, res) => {
	try {
		const { username, eventID } = req.body;
		var ref = db.ref('/data');
		var updates = {};
		updates[`/events/${eventID}`] = null;
		await ref.update(updates);
		res.send('success');
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// join event
app.post('/join/event', async (req, res) => {
	try {
		const { username, eventID } = req.body;
		const eventsRef = db.ref(`/data/events/${eventID}/attendees`);
		let updates = {
			[username]: 0
		};
		await eventsRef.update(updates);
		res.send('success');
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// leave event
app.post('/leave/event', async (req, res) => {
	try {
		const { username, eventID } = req.body;
		const eventsRef = db.ref(`/data/events/${eventID}/attendees`);
		let updates = {
			[username]: null
		};
		await eventsRef.update(updates);
		res.send('success');
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// get personal events
app.get('/events', async (req, res) => {
	try {
		const username = req.headers['username'];
		const eventsRef = db.ref(`/data/events`);
		const eventRef = eventsRef.orderByChild("owner").equalTo(username);
		var eventsSnapshot = await eventRef.once('value');
		var eventsData = eventsSnapshot.val();
		console.log("typeof(eventsData): ");
		console.log(typeof(eventsData));
		console.log(eventsSnapshot.key);
		res.send(eventsData);
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

function makeid() {
	var text = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < 7; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

// A function to wait X amount of time before returning a resolved promise
// with value boolean true
pleaseHoldFor = milliseconds => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, milliseconds);
	});
};