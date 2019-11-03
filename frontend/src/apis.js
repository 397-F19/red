import axios from 'axios';
var client = require('./client');

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

export async function getUserEvents(uid) {
	const res = await axios.get('/events/attendee', { headers: { uid } });
	if (res.status !== 200) {
		throw Error(res.message);
	}
	console.log(res);
	return res.data;
}

export async function createUser(data) {
	// Example postRequest with data. Replace static with form input
	postRequest('/users', {
		uid: data.uid,
		name: data.name,
		email: data.email,
		avatar: data.avatar
	})
		.then(res => {
			console.log(res);
			let friendsListString = JSON.stringify(res.friendsList);
			localStorage.setItem('friendsList', friendsListString);
			return res;
		})
		.catch(err => console.log(err));
}

export async function addFriend(data) {
	postRequest('/add/friend', {
		email: data.email,
		uid: data.uid
	})
		.then(res => {
			const code = res;
			console.log(code);
			if (code.res === 'success') {
				alert('You have successfully added your friend!');
				let friendsList = JSON.parse(localStorage.getItem('friendsList'));
				friendsList.push(res.data);
				localStorage.setItem('friendsList', JSON.stringify(friendsList));
			} else {
				alert('You friend has not registered!');
			}
		})
		.catch(err => console.log(err));
}

export async function getUserInfo(uid) {
	postRequest('/users/uid', {
		uid: uid
	})
		.then(res => {
			const code = res;
			console.log(code);
			return res;
		})
		.catch(err => console.log(err));
}

export async function createEvent(data) {
	// Example postRequest with data. Replace static with form input
	let success = true;
	await postRequest('/events', {
		title: data.title,
		description: data.description,
		location: data.location,
		owner: data.owner,
		start_time: data.start_time,
		end_time: data.end_time,
		attendees: data.attendees,
		attendeeUID: data.attendeeUID
	})
		.then(res => {
			const code = res;
			console.log(code);
			return true;
		})
		.catch(err => {
			console.log(err);
			success = false;
		});
	return success;
}

export async function grabEvents(uid) {
	// Example postRequest with data. Replace static with form input
	let returnList = [];
	try {
		await getRequest('/events').then(res => {
			const eventList = res;
			console.log(eventList);
			eventList.forEach(async item => {
				if (item.owner === uid) {
					await returnList.push(item);
				}
			});
		});
		console.log(returnList);
		return returnList;
	} catch (e) {
		console.log(e);
	}
}

export async function deleteEvent(id) {
	try {
		await axios.delete('/events/id', { headers: { id } }).then(res => {
			console.log(res);
		});
	} catch (e) {
		console.log(e);
	}
}
