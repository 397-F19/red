import React from 'react';

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

	componentDidMount() {
		let friendListObject = JSON.parse(localStorage.getItem('friendsList'));
		console.log(Object.values(friendListObject));
		let tempList = [];
		Object.values(friendListObject)
			.slice(1)
			.forEach(item => {
				tempList.push(item.name);
			});
		this.setState({
			friendsList: tempList
		});
	}

	componentWillUpdate() {}
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
		const data = {
			title: this.state.title,
			description: this.state.description,
			location: this.state.location,
			owner: owner,
			start_time: start.toString(),
			end_time: end.toString(),
			attendees: this.state.friendsInvited
		};
		console.log(data);
		const res = await createEvent(data);
		console.log(res);
		if (!res) {
			alert('Please input the information correctly!');
		} else {
			alert('Your event is successfully created!');
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
														placeholder='What are you going to be doing?'
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
														placeholder='Describe your event a little so your friends understand it.'
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
														defaultValue='2019-10-20T10:30:00'
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
														defaultValue='2019-10-20T10:30:00'
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
														placeholder='Please provide the event address'
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
														Type friends' names to invite (Enter anyone from
														group Red to try it out!)
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
