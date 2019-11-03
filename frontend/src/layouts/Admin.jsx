import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import DemoNavbar from 'components/Navbars/DemoNavbar.jsx';
import Footer from 'components/Footer/Footer.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from 'routes.js';
import NotificationAlert from 'react-notification-alert';
import { createUser, getUserInfo } from '../apis';

var ps;
const config = require('../firebaseKey.json');
firebase.initializeApp(config);
const auth = firebase.auth();
var db = firebase.database();
// var ref = db.ref('/data');

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: 'black',
			activeColor: 'info',
			auth: false,
			avatar:
				'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png'
		};
		this.mainPanel = React.createRef();
		this.notificationAlert = React.createRef();
	}

	componentDidMount() {
		if (navigator.platform.indexOf('Win') > -1) {
			ps = new PerfectScrollbar(this.mainPanel.current);
			document.body.classList.toggle('perfect-scrollbar-on');
		}
		let displayName = localStorage.getItem('displayName');
		let email = localStorage.getItem('email');
		let photoURL = localStorage.getItem('photoURL');
		let auth = localStorage.getItem('auth');
		let uid = localStorage.getItem('uid');
		this.setState({
			displayName,
			email,
			avatar: photoURL,
			auth,
			uid
		});
	}
	componentWillUnmount() {
		if (navigator.platform.indexOf('Win') > -1) {
			ps.destroy();
			document.body.classList.toggle('perfect-scrollbar-on');
		}
	}
	componentDidUpdate(e) {
		if (e.history.action === 'PUSH') {
			this.mainPanel.current.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
		}
	}
	handleActiveClick = color => {
		this.setState({ activeColor: color });
	};
	handleBgClick = color => {
		this.setState({ backgroundColor: color });
	};
	saveState = state => {
		localStorage.setItem('displayName', state.user.displayName);
		localStorage.setItem('email', state.user.email);
		localStorage.setItem('photoURL', state.user.photoURL);
		localStorage.setItem('auth', state.auth);
		localStorage.setItem('uid', state.user.uid);
	};

	signInWithGoogle = async () => {
		const googleAuthProvider = await new firebase.auth.GoogleAuthProvider();
		let success = true;

		const data = await auth.signInWithPopup(googleAuthProvider).catch(error => {
			console.log(error);
			success = false;
		});
		console.log(data);
		this.setState({
			userData: data,
			auth: true,
			avatar: data.user.photoURL,
			owner: data.user.uid
		});

		if (success) {
			const parseData = {
				uid: data.user.uid,
				name: data.user.displayName,
				email: data.user.email,
				avatar: data.user.photoURL
			};
			await createUser(parseData);
			// getUserInfo(data.user.uid);
		}

		const state = {
			user: {
				photoURL: data.user.photoURL,
				displayName: data.user.displayName,
				email: data.user.email,
				uid: data.user.uid
			},
			auth: true
		};
		await this.saveState(state);
		console.log('success content is: ' + success);
		console.log('events localStorage', localStorage.getItem('events'));
		var options = {
			place: 'tr',
			message: (
				<div>
					<div>Successfully logged in.</div>
				</div>
			),
			type: 'primary',
			icon: 'nc-icon nc-bell-55',
			autoDismiss: 3
		};
		this.notificationAlert.current.notificationAlert(options);

		return success;
	};

	logout() {
		localStorage.clear();
		var options = {
			place: 'tr',
			message: (
				<div>
					<div>Successfully logged out.</div>
				</div>
			),
			type: 'primary',
			icon: 'nc-icon nc-bell-55',
			autoDismiss: 3
		};
		this.notificationAlert.current.notificationAlert(options);
		this.setState({
			auth: false,
			avatar:
				'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png'
		});
		localStorage.removeItem('displayName');
		localStorage.removeItem('email');
		localStorage.removeItem('photoURL');
		localStorage.removeItem('auth');
		localStorage.removeItem('uid');
	}

	updateFriendsList(friendsList) {
		this.setState(friendsList);
	}

	render() {
		return (
			<div className='wrapper'>
				<NotificationAlert ref={this.notificationAlert} />
				<Sidebar
					{...this.props}
					routes={routes}
					bgColor={this.state.backgroundColor}
					activeColor={this.state.activeColor}
				/>
				<div className='main-panel' ref={this.mainPanel}>
					<DemoNavbar
						{...this.props}
						signInWithGoogle={() => this.signInWithGoogle()}
						logout={() => this.logout()}
						auth={this.state.auth}
						avatar={this.state.avatar}
					/>
					<Switch>
						{routes.map((prop, key) => {
							return (
								<Route
									path={prop.layout + prop.path}
									component={prop.component}
									key={key}
								/>
							);
						})}
					</Switch>
					<Footer fluid />
				</div>
				{/* <FixedPlugin
					bgColor={this.state.backgroundColor}
					activeColor={this.state.activeColor}
					handleActiveClick={this.handleActiveClick}
					handleBgClick={this.handleBgClick}
				/> */}
			</div>
		);
	}
}

export default Dashboard;
