import React from 'react';
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
			eventList = await grabEvents(this.state.uid);
			attendEventList = await getUserEvents(this.state.uid);
		}
		console.log(eventList, attendEventList);
		this.setState({ eventList, displayName, attendEventList });
	};

	deleteEvent = async id => {
		if (window.confirm(`Are you sure to delete this event?`)) {
			let tempList = this.state.eventList.filter(item => item.id !== id);
			await deleteEvent(id);
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
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Events created by me</CardTitle>
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
												<th>Action</th>
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
															{item.attendees.map(item => `${item}, `)}
														</td>
														<td>
															<Button
																color='primary'
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
						<Col md='12'>
							<Card className='card-plain'>
								<CardHeader>
									<CardTitle tag='h4'>Attending events</CardTitle>
									<p className='card-category'>
										These are events filtered based on your personal calendar.
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
															{item.attendees.map(item => `${item}, `)}
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
