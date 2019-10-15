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
var ref = db.ref('/data');
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

// Creates and stores a new room entry on firebase database. returns room_code
// to front-end to share with other users
app.post('/create/event', async (req, res) => {
	try {
		const { location, title, time, attendees, desc, username } = req.body;

		let postData = {
			title: title,
			desc: desc,
			location: location,
			time: time,
			attendees: attendees
		};
		var ref = db.ref('/data');
		var updates = {};
		updates[`/${username}/events`] = postData;
		await ref.update(updates);
		res.send('success');
	} catch (e) {
		res.sendStatus(400).send(e);
	}
});

function makeid() {
	var text = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

app.post('/create/user', async (req, res) => {});

// A function to wait X amount of time before returning a resolved promise
// with value boolean true
pleaseHoldFor = milliseconds => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, milliseconds);
	});
};
