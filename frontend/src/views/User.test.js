import React from 'react';
import { render } from '@testing-library/react';
import UserPage from './Restaurant';

const friends = [
	{
		avatar: 'https://lh3.googleusercontent.com/a-/AAuE7mAFri...',
		email: 'mingyaotan2020@u.northwestern.edu',
		name: 'Mingyao Tan',
		uid: 'LSx7YIvcHVZXOvtyYiPiLIb3R8o1'
	},
	{
		avatar: 'https://lh6.googleusercontent.com/-8hR_S3GCmsM/...',
		email: 'bradleymramos@gmail.com',
		name: 'Bradley Ramos',
		uid: 'H63C67sZgFfspjYHV1CAT0DyHLL2'
	}
];
const key = 'friendList';

describe('UserPage', () => {
	it('display userpage', () => {
		const { getByTestId } = render(
			<UserPage key={key} friendsList={friends} dropdownOpen={true} />
		);

		const elem = getByTestId('UserPage1');
		expect(elem.innerHTML).toBe('Your friends');
	});
});
