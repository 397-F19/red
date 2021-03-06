import React from 'react';
import firebase from 'firebase';
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	FormGroup,
	Form,
	Input,
	Row,
	Col
} from 'reactstrap';
import Chips from 'react-chips';
import { createEvent } from '../apis';

class AddEvents extends React.Component {
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
		let tempList = [];
		let nameUIDList = {};
		if (friendsListObject) {
			Object.values(friendsListObject)
				.slice(1)
				.forEach(item => {
					tempList.push(item.name);
					nameUIDList[item.name] = [item.uid];
				});
		}
		this.setState({
			friendsList: tempList || []
		});
	}

	onChange = friendsInvited => {
		this.setState({ friendsInvited });
	};

	onChangeTitle = e => {
		this.setState({ title: e.target.value });
	};

	onChangeDesc = e => {
		this.setState({ description: e.target.value });
	};

	onChangeStartTime = e => {
		this.setState({ start_time: e.target.value });
	};

	onChangeEndTime = e => {
		this.setState({ end_time: e.target.value });
	};

	onChangeLocation = e => {
		this.setState({ location: e.target.value });
	};

	createButton = async () => {
		let owner = localStorage.getItem('uid');
		if (!owner) {
			alert('Please login!');
			return;
		}
		let start = new Date(this.state.start_time);
		let end = new Date(this.state.end_time);
		let attendeeUID = [];
		let friendsListObject = Object.values(
			JSON.parse(localStorage.getItem('friendsList'))
		);
		this.state.friendsInvited.forEach(item => {
			friendsListObject.forEach(friend => {
				if (friend.name === item) {
					attendeeUID.push(friend.uid);
				}
			});
		});
		if (
			!this.state.title ||
			!this.state.description ||
			!this.state.location ||
			!this.state.start_time ||
			!this.state.end_time ||
			this.state.friendsInvited.length === 0
		) {
			alert('Please enter all the fields!');
		} else {
			const data = {
				title: this.state.title,
				description: this.state.description,
				location: this.state.location,
				owner,
				start_time: start.toString(),
				end_time: end.toString(),
				attendees: this.state.friendsInvited,
				attendeeUID
			};
			console.log(data);
			const res = await createEvent(firebase, data);
			console.log(res);
			if (!res) {
				alert('Please input the information correctly!');
			} else {
				alert('Your event is successfully created!');
			}
		}
	};

	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card className='card-user'>
								<CardHeader>
									<CardTitle tag='h5'>Add Event</CardTitle>
								</CardHeader>
								<CardBody>
									<Form>
										<Row>
											<Col className='pr-1' md='3'>
												<FormGroup>
													<label>Title</label>
													<Input
														defaultValue=''
														placeholder='What do you want to do?'
														type='text'
														onChange={this.onChangeTitle}
													/>
												</FormGroup>
											</Col>
											<Col className='px-1' md='9'>
												<FormGroup>
													<label>Description</label>
													<Input
														defaultValue=''
														placeholder='What are all the details your friends need to know?'
														type='text'
														onChange={this.onChangeDesc}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className='pr-1' md='6'>
												<FormGroup>
													<label>Start Time</label>
													<Input
														defaultValue='2019-11-04T13:30:00'
														id='example-datetime-local-input'
														type='datetime-local'
														onChange={this.onChangeStartTime}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className='pr-1' md='6'>
												<FormGroup>
													<label>End Time</label>
													<Input
														defaultValue='2019-11-04T15:30:00'
														id='example-datetime-local-input'
														type='datetime-local'
														onChange={this.onChangeEndTime}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md='12'>
												<FormGroup>
													<label>Location</label>
													<Input
														placeholder='Where is the event?'
														type='text'
														onChange={this.onChangeLocation}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className='pr-1' md='12'>
												<FormGroup>
													<label>
														Type friends' names to invite!
													</label>
													<Chips
														value={this.state.friendsInvited}
														onChange={this.onChange}
														// import the friends list into 'suggestions'
														suggestions={this.state.friendsList}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<div className='update ml-auto mr-auto'>
												<Button
													className='btn-round'
													color='primary'
													size='lg'
													onClick={() => this.createButton()}
												>
													Create event!
												</Button>
											</div>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default AddEvents;
