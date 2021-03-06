import React from 'react';
import firebase from 'firebase';
// reactstrap components
import randomstring from 'randomstring';
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Table,
	Row,
	Col,
	Button
} from 'reactstrap';
import { grabEvents, deleteEvent, getUserEvents } from '../apis';

/*
	Use getUserEvents('/events/attendee',localStorage.getItem('uid')) to retreive the user's events (attending + owned)
	Use getUserEvents('/events/owner',localStorage.getItem('uid')) to retreive user's events that they own specifically
*/

class Tables extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			eventList: [],
			attendEventList: [],
			uid: localStorage.getItem('uid') || '',
			auth: JSON.parse(localStorage.getItem('auth')) || false
		};
	}

	componentWillMount() {
		this.prework();
	}

	prework = async () => {
		let eventList = [];
		let attendEventList = [];
		let displayName = localStorage.getItem('displayName');
		if (this.state.auth) {
			eventList = await grabEvents(firebase, this.state.uid);
			attendEventList = await getUserEvents(firebase, this.state.uid);
		}
		console.log(attendEventList);
		this.setState({ eventList, displayName, attendEventList });
	};

	deleteEvent = async id => {
		if (window.confirm(`Are you sure to delete this event?`)) {
			let tempList = this.state.eventList.filter(item => item.id !== id);
			await deleteEvent(firebase, id);
			this.setState((prevState, props) => ({
				eventList: tempList
			}));
		}
	};

	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card className='card-plain'>
								<CardHeader>
									<CardTitle tag='h4'>My Events</CardTitle>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className='text-primary'>
											<tr>
												<th>Title</th>
												<th>Description</th>
												<th>Location</th>
												<th>Start</th>
												<th>End</th>
												<th>Owner</th>
												<th className='text-right'>Attendees</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{this.state.eventList.map(item => {
												return (
													<tr key={item.id}>
														<td>{item.title}</td>
														<td>{item.description}</td>
														<td>{item.location}</td>
														<td>{item.start_time}</td>
														<td>{item.end_time}</td>
														<td>{this.state.displayName}</td>
														<td className='text-right'>
															{item.attendees.map(item => `${item}, \n`)}
														</td>
														<td>
															<Button
																color='primary'
															>
																Edit
															</Button>
															<Button
																color='danger'
																onClick={() => this.deleteEvent(item.id)}
															>
																Delete
															</Button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
						<Card className='card-plain'>
								<CardHeader>
									<CardTitle tag='h4'>Invited Events</CardTitle>
									<p className='card-category'>
										These Invited Events are filtered by your calendar
									</p>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className='text-primary'>
											<tr>
												<th>Title</th>
												<th>Description</th>
												<th>Location</th>
												<th>Start</th>
												<th>End</th>
												<th>Owner</th>
												<th className='text-right'>Attendees</th>
											</tr>
										</thead>
										<tbody>
											{this.state.attendEventList.map(item => {
												return (
													<tr key={randomstring.generate(5)}>
														<td>{item.title}</td>
														<td>{item.description}</td>
														<td>{item.location}</td>
														<td>{item.start_time}</td>
														<td>{item.end_time}</td>
														<td>{item.owner}</td>
														<td className='text-right'>
															{item.attendees.map(item => `${item}, \n`)}
														</td>
														<td>
															<Button
																color='success'
															>
																Accept
															</Button>
															<Button
																color='danger'
																onClick={() => this.deleteEvent(item.id)}
															>
																Reject
															</Button>
															</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
								</CardBody>
							</Card>
						<Col md='12'>
							<Card className='card-plain'>
								<CardHeader>
									<CardTitle tag='h4'>Attending Events</CardTitle>
									<p className='card-category'>
									</p>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className='text-primary'>
											<tr>
												<th>Title</th>
												<th>Description</th>
												<th>Location</th>
												<th>Start</th>
												<th>End</th>
												<th>Owner</th>
												<th className='text-right'>Attendees</th>
											</tr>
										</thead>
										<tbody>
											{this.state.attendEventList.map(item => {
												return (
													<tr key={randomstring.generate(5)}>
														<td>{item.title}</td>
														<td>{item.description}</td>
														<td>{item.location}</td>
														<td>{item.start_time}</td>
														<td>{item.end_time}</td>
														<td>{item.owner}</td>
														<td className='text-right'>
															{item.attendees.map(item => `${item}, \n`)}
														</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
								</CardBody>
							</Card>
							
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default Tables;
