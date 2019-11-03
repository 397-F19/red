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
			friendsList: localStorage.getItem('friendsList') || []
		};
	}

	componentDidMount() {}

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

	createButton = () => {
		let owner = localStorage.getItem('uid');
		if (!owner) {
			alert('Please login!');
			return;
		}
		const data = {
			title: this.state.title,
			description: this.state.description,
			location: this.state.location,
			owner: owner,
			start_time: this.state.start_time,
			end_time: this.state.end_time,
			attendees: this.state.friendsInvited
		};
		const res = createEvent(data);
		if (res) {
			alert('Your event is successfully created');
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
														/* Use "getUserInfo(localStorage.getItem('uid'))" to retreive the user object, access user's list of friends. parse their names, not uids */
														suggestions={[
															'Bradley Matthew Ramos',
															'Aaron Kaneti',
															"Danyil 'Dan' Pysmak",
															'Amulya Angajala',
															'Terry Tan'
														]}
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
