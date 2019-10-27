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

///////////
// USERS
///////////
// create a new user with using Google Auth's uid, name and email
app.post('/users', async (req, res) => {
	try {
		console.log("POST /users");
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

// Get a list of all users
app.get('/users', async (req, res) => {
	try {
		console.log("GET /users");
		const usersRef = db.ref(`/data/users`);
		let usersSnapshot = await usersRef.once('value');
		let usersData = usersSnapshot.val();
		let response = [];
		for (let key in usersData) {
			let keyObj = { "uid": key};
			let obj = Object.assign(keyObj, usersData[key]);
			response.push(obj);
		}
		res.send(response);
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// Get a specific users object by his uid
app.get('/users/uid', async (req, res) => {
	try {
		console.log("GET /users/uid");
		const uid = req.headers['uid'];
		const usersRef = db.ref(`/data/users`);
		let usersSnapshot = await usersRef.orderByKey().equalTo(uid).once('value');
		if (usersSnapshot.exists()) {
			let usersData = usersSnapshot.val();
			let keyObj = { "uid": uid};
			let response = Object.assign(keyObj, usersData[uid]);
			res.send(response);
		} else {
			res.sendStatus(404).send();
		}
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});


///////////
// EVENTS
///////////
// Create a new event. owner and attendees reference user_uid's
app.post('/events', async (req, res) => {
	try {
		console.log("POST /events");
		const { title, description, location, owner, start_time, end_time, attendees } = req.body;
		let eventID = makeid();
		const eventsRef = db.ref('/data/events');
		let eventsData = {
			[eventID] : {
				title: title,
				description: description,
				location: location,
				owner: owner,
				start_time: start_time,
				end_time: end_time,
				attendees: attendees
			}
		};
		await eventsRef.update(eventsData);
		let response = {"id" : eventID};
		res.send(response);
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// Get a list of all events
app.get('/events', async (req, res) => {
	try {
		console.log("GET /events");
		const eventsRef = db.ref(`/data/events`);
		let eventsSnapshot = await eventsRef.once('value');
		var eventsData = eventsSnapshot.val();
		let response = [];
		for (let key in eventsData) {
			let keyObj = { "id": key};
			let obj = Object.assign(keyObj, eventsData[key]);
			response.push(obj);
		}
		res.send(response);
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// Get a specific event by it's id
app.get('/events/id', async (req, res) => {
	try {
		console.log("GET /events/id");
		const id = req.headers['id'];
		const eventsRef = db.ref(`/data/events`);
		let eventsSnapshot = await eventsRef.orderByKey().equalTo(id).once('value');
		if (eventsSnapshot.exists()) {
			let eventData = eventsSnapshot.val();
			let keyObj = { "id": id};
			let response = Object.assign(keyObj, eventData[id]);
			res.send(response);
		} else {
			res.sendStatus(404).send();
		}
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// Get a list of events where a user with user_uid is the owner
app.get('/events/owner', async (req, res) => {
	try {
		const uid = req.headers['uid'];
		console.log("GET /events/owner : ", uid);
		const eventsRef = db.ref(`/data/events`);
		let eventsSnapshot = await eventsRef.orderByChild("owner").equalTo(uid).once('value');
		let eventsData = eventsSnapshot.val();
		let response = [];
		for (let key in eventsData) {
			let keyObj = { "id": key};
			let obj = Object.assign(keyObj, eventsData[key]);
			response.push(obj);
		}
		res.send(response);
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// Get a list of events where a user with user_uid is an attendee or owner
app.get('/events/attendee', async (req, res) => {
	try {
		const uid = req.headers['uid'];
		console.log("GET /events/attendee : ", uid);
		const eventsRef = db.ref(`/data/events`);
		let eventsSnapshot = await eventsRef.once('value');
		let eventsData = eventsSnapshot.val();
		let response = [];
		for (let key in eventsData) {
			let event  = eventsData[key];
			if (event["owner"] == uid) {
				let keyObj = { "id": key};
				let obj = Object.assign(keyObj, eventsData[key]);
				response.push(obj);
				continue;
			}
			for (var i = 0; i < event["attendees"].length; i++) {
				if (event["attendees"][i] == uid) {
					let keyObj = { "id": key};
					let obj = Object.assign(keyObj, eventsData[key]);
					response.push(obj);
					break;
				}
			}
		}
		res.send(response);
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

// Delete a specific event by it's id
app.delete('/events/id', async (req, res) => {
	try {
		const id = req.headers['id'];
		console.log("DELETE /events/id : ", id);
		let path = "/data/events/" + id;
		const eventRef = db.ref(path);
		let eventSnapshot = await eventRef.once('value');
		if (eventSnapshot.exists()) {
			await eventRef.remove()
				.then(function() {
					console.log("Remove succeeded.")
				})
				.catch(function(error) {
					console.log("Remove failed: " + error.message)
				});
			res.send("Success");
		} else {
			res.sendStatus(404).send();
		}
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
// app.post('/create/event', async (req, res) => {
// 	try {
// 		const { location, title, time, attendees, desc, username } = req.body;
// 		let eventID = makeid();
// 		const eventsRef = db.ref('/data/events');
// 		// const userRef = db.ref(`/data/users/${username}/events`);
// 		// var eventsSnapshot = await userRef.once('value');
// 		let eventsData = {
// 			[eventID] : {
// 				owner: username,
// 				title: title,
// 				desc: desc,
// 				location: location,
// 				time: time,
// 				attendees: attendees
// 			}
// 		};
// 		await eventsRef.update(eventsData);
// 		res.send('success');
// 	} catch (e) {
// 		res.sendStatus(400).send(e);
// 	}
// });

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
// app.get('/events', async (req, res) => {
// 	try {
// 		const username = req.headers['username'];
// 		const eventsRef = db.ref(`/data/events`);
// 		const eventRef = eventsRef.orderByChild("owner").equalTo(username);
// 		var eventsSnapshot = await eventRef.once('value');
// 		var eventsData = eventsSnapshot.val();
// 		console.log("typeof(eventsData): ");
// 		console.log(typeof(eventsData));
// 		console.log(eventsSnapshot.key);
// 		res.send(eventsData);
// 	} catch (e) {
// 		res.sendStatus(400).send(e);
// 	}
// });

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