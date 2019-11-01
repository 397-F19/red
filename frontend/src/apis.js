import axios from 'axios';

export async function getRequest(route) {
	const res = await axios.get(route);
	if (res.status !== 200) {
		throw Error(res.message);
	}
	return res.data;
}

export async function postRequest(route, data = null) {
	if (!data) {
		throw Error('Cannot send post request without data');
	} else {
		const res = await axios.post(route, data);

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
		email: data.email
	})
		.then(res => {
			const code = res.code;
			console.log(code);
		})
		.catch(err => console.log(err));
}
