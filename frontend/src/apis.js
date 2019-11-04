import axios from 'axios';
var client = require('./client');
// // initialize fire base dependencies & secret
// const firebase = require('firebase/app');
// const auth = firebase.auth();
// const db = firebase.database();
// // firebase initialization
// const serviceAccount = {
// 	apiKey: 'AIzaSyCcqThTsn5RFIkWoDfbM8iI8ikRG59PP-U',
// 	authDomain: 'meetme-3e373.firebaseapp.com',
// 	databaseURL: 'https://meetme-3e373.firebaseio.com',
// 	projectId: 'meetme-3e373',
// 	storageBucket: 'meetme-3e373.appspot.com',
// 	messagingSenderId: '1016155699277',
// 	appId: '1:1016155699277:web:a439fafce586e1ef794404'
// };
// firebase.initializeApp(serviceAccount);

export async function signin(firebase) {
	const auth = firebase.auth();
	const googleAuthProvider = await new firebase.auth.GoogleAuthProvider();
	let success = true;

	const data = await auth.signInWithPopup(googleAuthProvider).catch(error => {
		console.log(error);
		success = false;
	});
	const res = {
		success,
		data
	};
	return res;
}

export async function getRequest(route) {
	const res = await client.get(route);
	if (res.status !== 200) {
		throw Error(res.message);
	}
	return res.data;
}

export async function postRequest(route, data = null) {
	if (!data) {
		throw Error('Cannot send post request without data');
	} else {
		const res = await client.post(route, data);

		if (res.status !== 200) {
			throw Error(res.message);
		}
		return res.data;
	}
}

export async function getUserEvents(firebase, uid) {
	try {
		const db = firebase.database();
		const eventsRef = db.ref(`/data/events`);
		let eventsSnapshot = await eventsRef.once('value');
		let events = await Object.values(eventsSnapshot.val());
		let response = [];
		console.log(events);
		for (let i = 0; i < events.length; i += 1) {
			if (events[i].attendeeUID) {
				let attendees = await events[i].attendeeUID;
				for (let a = 0; a < attendees.length; a += 1) {
					if (attendees[a] === uid) {
						let usersSnapshot = await db
							.ref(`/data/users/${events[i].owner}`)
							.once('value');
						let userData = usersSnapshot.val();
						events[i].owner = userData.name;
						response.push(events[i]);
						console.log(events[i]);
					}
				}
			}
		}
		console.log(response);
		return response;
	} catch (e) {
		console.log(e);
	}
}

export async function createUser(firebase, data) {
	const db = firebase.database();
	const { uid, name, email, avatar } = data;

	const friendsRef = db.ref(`/data/users/${uid}/friends`);
	let friendsSnapshot = await friendsRef.once('value');
	let friendsList = friendsSnapshot.val();

	const eventsRef = db.ref(`/data/users/${uid}/eventsList`);
	let eventsSnapshot = await eventsRef.once('value');
	let eventsList = eventsSnapshot.val();

	let postData = {
		[uid]: {
			name: name,
			email: email,
			avatar: avatar,
			friends: friendsList || ['placeholder'],
			eventsList: eventsList || ['placeholder']
		}
	};
	let res = {
		uid,
		friendsList
	};
	var ref = db.ref('/data/users');
	await ref.update(postData);
	console.log(res);
	let friendsListString = JSON.stringify(res.friendsList);
	localStorage.setItem('friendsList', friendsListString);
	return res;
}

export async function addFriend(firebase, data) {
	const db = firebase.database();

	const { email, uid } = data;

	// find person with that exact email account
	const usersRef = db.ref(`/data/users`);
	let usersSnapshot = await usersRef.once('value');
	let usersData = usersSnapshot.val();
	let isExisted = false;
	let response = {};
	for (let key in usersData) {
		if (usersData[key].email === email) {
			console.log(key);
			const friendsRef = db.ref(`/data/users/${uid}/friends`);
			let friendsSnapshot = await friendsRef.once('value');
			let friendsList = friendsSnapshot.val();
			await Object.values(friendsList).forEach(item => {
				if (item.email === email) {
					alert('You friend is existed in your list!');
					isExisted = true;
				}
			});
			if (!isExisted) {
				let friendObject = {
					uid: key,
					avatar: usersData[key].avatar,
					email: usersData[key].email,
					name: usersData[key].name
				};
				friendsList.push(friendObject);
				await friendsRef.update(friendsList);
				response = { res: 'success', data: friendObject };
			}
		}
	}

	if (response.res === 'success') {
		alert('You have successfully added your friend!');
		let friendsList = JSON.parse(localStorage.getItem('friendsList'));
		friendsList.push(response.data);
		localStorage.setItem('friendsList', JSON.stringify(friendsList));
	} else {
		alert('You friend has not registered!');
	}
}

// export async function getUserInfo(firebase, uid) {
// 	const db = firebase.database();

// 	// postRequest('/users/uid', {
// 	// 	uid: uid
// 	// })
// 	// 	.then(res => {
// 	// 		const code = res;
// 	// 		console.log(code);
// 	// 		return res;
// 	// 	})
// 	// 	.catch(err => console.log(err));

// 	const usersRef = db.ref(`/data/users`);
// 	let usersSnapshot = await usersRef
// 		.orderByKey()
// 		.equalTo(uid)
// 		.once('value');
// 	if (usersSnapshot.exists()) {
// 		let usersData = usersSnapshot.val();
// 		let keyObj = { uid: uid };
// 		let response = Object.assign(keyObj, usersData[uid]);
// 		res.send(response);
// 	} else {
// 		res.sendStatus(404).send();
// 	}
// }

export async function createEvent(firebase, data) {
	const db = firebase.database();

	const {
		title,
		description,
		location,
		owner,
		start_time,
		end_time,
		attendees,
		attendeeUID
	} = data;
	let eventID = makeid();
	const eventsRef = db.ref('/data/events');
	let eventsData = {
		[eventID]: {
			title,
			description,
			location,
			owner,
			start_time,
			end_time,
			attendees,
			attendeeUID
		}
	};
	try {
		await eventsRef.update(eventsData);
		return true;
	} catch (e) {
		return false;
	}
}

export async function grabEvents(firebase, uid) {
	const db = firebase.database();

	let returnList = [];

	const eventsRef = db.ref(`/data/events`);
	let eventsSnapshot = await eventsRef.once('value');
	var eventsData = eventsSnapshot.val();
	let response = [];
	for (let key in eventsData) {
		let keyObj = { id: key };
		let obj = Object.assign(keyObj, eventsData[key]);
		response.push(obj);
	}
	response.forEach(async item => {
		if (item.owner === uid) {
			await returnList.push(item);
		}
	});
	return returnList;
}

export async function deleteEvent(firebase, id) {
	const db = firebase.database();

	try {
		let path = '/data/events/' + id;
		const eventRef = db.ref(path);
		let eventSnapshot = await eventRef.once('value');
		if (eventSnapshot.exists()) {
			await eventRef
				.remove()
				.then(function() {
					console.log('Remove successfully.');
				})
				.catch(function(error) {
					console.log('Remove failed: ' + error.message);
				});
		} else {
			return '404';
		}
	} catch (e) {
		console.log(e);
	}
}

function makeid() {
	var text = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < 7; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
