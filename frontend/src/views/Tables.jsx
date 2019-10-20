/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Table,
	Row,
	Col
} from 'reactstrap';

class Tables extends React.Component {
	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">Event List</CardTitle>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												<th>Description</th>
												<th>Location</th>
												<th>Time</th>
												<th className="text-right">Attendees</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Dinner</td>
												<td>Shang Noodle</td>
												<td>20/10/2019 18:00 PM</td>
												<td className="text-right">Bradley, Terry</td>
											</tr>
											<tr>
												<td>Study</td>
												<td>Core D Main Lib</td>
												<td>20/10/2019 11:00 AM</td>
												<td className="text-right">
													Bradley, Aaron, Danyil, Amulya, Terry
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
									<CardTitle tag="h4">Whole Event List</CardTitle>
									<p className="card-category">
										These are events filtered based on your personal calendar.
									</p>
								</CardHeader>
								<CardBody>
									<Table responsive>
										<thead className="text-primary">
											<tr>
												<th>Description</th>
												<th>Location</th>
												<th>Time</th>
												<th className="text-right">Attendees</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Dinner</td>
												<td>Shang Noodle</td>
												<td>20/10/2019 18:00 PM</td>
												<td className="text-right">Bradley, Terry</td>
											</tr>
											<tr>
												<td>Study</td>
												<td>Core D Main Lib</td>
												<td>20/10/2019 11:00 AM</td>
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
