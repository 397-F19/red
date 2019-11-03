// // import Dashboard from 'views/Dashboard.jsx';
// import Notifications from 'views/Notifications.jsx';
// import Icons from 'views/Icons.jsx';
// import Typography from 'views/Typography.jsx';
import TableList from 'views/Tables.jsx';
import UserPage from 'views/User.jsx';
import AddEvents from 'views/AddEvents.jsx';
import AddFriends from 'views/AddFriends.jsx';

var routes = [
	{
		path: '/tables',
		name: 'Event List',
		icon: 'nc-icon nc-tile-56',
		component: TableList,
		layout: '/admin'
	},
	{
		path: '/add-events',
		name: 'Add event',
		icon: 'nc-icon nc-simple-add',
		component: AddEvents,
		layout: '/admin'
	},
	{
		path: '/add-friends',
		name: 'Add friends',
		icon: 'nc-icon nc-circle-10',
		component: AddFriends,
		layout: '/admin'
	},
	{
		path: '/user-page',
		name: 'User Profile',
		icon: 'nc-icon nc-badge',
		component: UserPage,
		layout: '/admin'
	}
	// {
	// 	path: '/notifications',
	// 	name: 'Notifications',
	// 	icon: 'nc-icon nc-bell-55',
	// 	component: Notifications,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/typography',
	// 	name: 'Typography',
	// 	icon: 'nc-icon nc-caps-small',
	// 	component: Typography,
	// 	layout: '/admin'
	// }
];
export default routes;
