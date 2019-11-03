import React from 'react';
import { deleteEvent, getUserEvents } from '../apis';

// reactstrap components
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

/*
	Use getUserEvents('/events/attendee',localStorage.getItem('uid')) to retreive the user's events (attending + owned)
	Use getUserEvents('/events/owner',localStorage.getItem('uid')) to retreive user's events that they own specifically
	Use deleteEvent('/events/id', ID_OF_EVENT) to delete the event from the database. You can only do this if you own the event.

*/


class Tables extends React.Component {
	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">My Events</CardTitle>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												<th>Title</th>
												<th>Description</th>
												<th>Location</th>
												<th>Time</th>
												<th>Owner</th>
												<th className="text-right">Attendees</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Dinner</td>
												<td>
													blablaasdasd
												</td>
												<td>Shang Noodle</td>
												<td>20/10/2019 18:00 PM</td>
												<td>blabla</td>
												<td className="text-right">Bradley, Terry</td>
												<td>
													<Button color="primary">Delete</Button>
												</td>
											</tr>
											<tr>
												<td>Dinner</td>
												<td>blabla</td>
												<td>Shang Noodle</td>
												<td>20/10/2019 18:00 PM</td>
												<td>blabla</td>
												<td className="text-right">Bradley, Terry</td>
												<td>
													<Button color="primary">Delete</Button>
												</td>
											</tr>
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
						<Col md="12">
							<Card className="card-plain">
								<CardHeader>
									<CardTitle tag="h4">Attending Events</CardTitle>
									<p className="card-category">
										These are events filtered based on your personal calendar.
									</p>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												<th>Title</th>
												<th>Description</th>
												<th>Location</th>
												<th>Time</th>
												<th>Owner</th>
												<th className="text-right">Attendees</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Dinner</td>
												<td>blabla</td>
												<td>Shang Noodle</td>
												<td>20/10/2019 18:00 PM</td>
												<td>blabla</td>
												<td className="text-right">Bradley, Terry</td>
											</tr>
											<tr>
												<td>Study</td>
												<td>blabla</td>
												<td>Core D Main Lib</td>
												<td>20/10/2019 11:00 AM</td>
												<td>blabla</td>
												<td className="text-right">
													Bradley, Aaron, Danyil, Amulya, Terry
												</td>
											</tr>
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
