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

class AddEvents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			dropdownOpen: false,
			color: 'transparent',
			friendsInvited: []
		};
	}

	onChange = friendsInvited => {
		this.setState({ friendsInvited });
	};

	render() {
		return (
			<>
				<div className="content">
					<Row>
						<Col md="12">
							<Card className="card-user">
								<CardHeader>
									<CardTitle tag="h5">Add Event</CardTitle>
								</CardHeader>
								<CardBody>
									<Form>
										<Row>
											<Col className="pr-1" md="3">
												<FormGroup>
													<label>Title</label>
													<Input
														defaultValue="Dinner"
														placeholder="dinner"
														type="text"
													/>
												</FormGroup>
											</Col>
											<Col className="px-1" md="9">
												<FormGroup>
													<label>Description</label>
													<Input
														defaultValue="Happy dinner."
														placeholder="description"
														type="text"
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="6">
												<FormGroup>
													<label>Datetime</label>
													<Input
														defaultValue="2019-10-20T10:30:00"
														id="example-datetime-local-input"
														type="datetime-local"
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md="12">
												<FormGroup>
													<label>Location</label>
													<Input
														defaultValue="Evanston, IL"
														placeholder="Event Address"
														type="text"
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md="12">
												<FormGroup>
													<label>People Invited</label>
													<Input
														defaultValue="Melbourne, Australia"
														placeholder="Home Address"
														type="text"
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="12">
												<FormGroup>
													<label>
														Choose friends to invite (Enter our group names to
														test)
													</label>
													<Chips
														value={this.state.friendsInvited}
														onChange={this.onChange}
														// import the friends list into 'suggestions'
														suggestions={[
															'Bradley',
															'Aaron',
															'Danyil',
															'Amulya',
															'Terry'
														]}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<div className="update ml-auto mr-auto">
												<Button className="btn-round" color="primary">
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
