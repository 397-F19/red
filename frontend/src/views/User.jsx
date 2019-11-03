import React from 'react';
import randomstring from 'randomstring';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Row,
	Col
} from 'reactstrap';

/*
	Use "getUserInfo(localStorage.getItem('uid'))" to retreive the user object
	Use getUserFriends(/friends/uid, localStorage.getItem('uid')) to retreive the user's list of friends.

*/

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			dropdownOpen: false,
			color: 'transparent',
			friendsInvited: [],
			friendsList: []
		};
	}

	componentWillMount() {
		let friendsListObject = JSON.parse(localStorage.getItem('friendsList'));
		let name = localStorage.getItem('displayName');
		let email = localStorage.getItem('email');
		let avatar = localStorage.getItem('photoURL');
		let tempList = [];
		if (friendsListObject) {
			Object.values(friendsListObject)
				.slice(1)
				.forEach(item => {
					tempList.push(item);
				});
			console.log('tempList', tempList);
		}
		this.setState({
			friendsList: tempList || [],
			email: email || '',
			name: name || '',
			avatar: avatar || ''
		});
	}
	sendEmail(item) {
		window.location.href = `mailto:${item.email}?subject=I have invited you to a new event!&body=Hi, ${item.name}!%0D%0A%0D%0AChect you MeetMe app to receive the invitation!%0D%0A%0D%0A${this.state.name}`;
	}
	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='4'>
							<Card className='card-user'>
								<div className='image'>
									<img
										alt='...'
										src={require('assets/img/damir-bosnjak.jpg')}
									/>
								</div>
								<CardBody>
									<div className='author'>
										<img
											alt='...'
											className='avatar border-gray'
											src={this.state.avatar}
										/>
										<h5 className='title'>{this.state.name}</h5>
										<p className='description'>{this.state.email}</p>
									</div>
								</CardBody>
								<CardFooter>
									<hr />
									<div className='button-container'>
										<Row>
											<Col className='ml-auto mr-auto' lg='4' md='6' xs='6'>
												<h5>
													{this.state.friendsList.length} <br />
													<small>Friend(s)</small>
												</h5>
											</Col>
										</Row>
									</div>
								</CardFooter>
							</Card>
						</Col>
						<Col md='8'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>My Friends</CardTitle>
								</CardHeader>
								<CardBody>
									<ul className='list-unstyled team-members'>
										{this.state.friendsList.map(item => {
											return (
												<li key={randomstring.generate(5)}>
													<Row>
														<Col md='2' xs='2'>
															<div className='avatar'>
																<img
																	alt='...'
																	className='img-circle img-no-padding img-responsive'
																	src={item.avatar}
																/>
															</div>
														</Col>
														<Col md='7' xs='7'>
															{item.name} <br />
															<span className='text-muted'>
																<small>{item.email}</small>
															</span>
														</Col>
														<Col className='text-right' md='3' xs='3'>
															<Button
																className='btn-round btn-icon'
																color='success'
																outline
																size='sm'
																onClick={() => this.sendEmail(item)}
															>
																<i className='fa fa-envelope' />
															</Button>
														</Col>
													</Row>
												</li>
											);
										})}
									</ul>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default User;
