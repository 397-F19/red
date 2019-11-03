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


export async function getUserEvents(route, user) {
	const res = await client.get(route, { 'headers': { 'uid': user } });
	if (res.status !== 200) {
		throw Error(res.message);
	}
	return res.data;
}

export async function deleteEvent(route, event_id) {
	if (!data) {
		throw Error('Cannot send post request without data');
	} else {
		const res = client.delete(route, { 'headers': { 'id': event_id } });

		if (res.status !== 200) {
			throw Error(res.message);
		}
		return res.data;
	}
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
			localStorage.setItem('friendsList', res.friendsList);
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
			return res;
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
	postRequest('/events', {
		title: data.title,
		description: data.description,
		location: data.location,
		owner: data.owner,
		start_time: data.start_time,
		end_time: data.end_time,
		attendees: data.attendees
	})
		.then(res => {
			const code = res;
			console.log(code);
			return true;
		})
		.catch(err => console.log(err));
}

const data = {
	name: 'sample',
	email: 'sample',
	avatar: 'sample',
	friendsList: [
		{
			name: 'sample',
			email: 'sample',
			avatar: 'sample'
		},
		{
			name: 'sample',
			email: 'sample',
			avatar: 'sample'
		},
		{
			name: 'sample',
			email: 'sample',
			avatar: 'sample'
		}
	]
};
