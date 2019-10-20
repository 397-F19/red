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
														defaultValue=""
														placeholder="What are you going to be doing?"
														type="text"
													/>
												</FormGroup>
											</Col>
											<Col className="px-1" md="9">
												<FormGroup>
													<label>Description</label>
													<Input
														defaultValue=""
														placeholder="Describe your event a little so your friends understand it."
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
														defaultValue=""
														placeholder="People you pick will show up here."
														type="text"
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="12">
												<FormGroup>
													<label>
														Choose friends to invite (Enter anyone from group Red to try it out!)
													</label>
													<Chips
														value={this.state.friendsInvited}
														onChange={this.onChange}
														// import the friends list into 'suggestions'
														suggestions={[
															'Bradley Matthew Ramos',
															'Aaron Kaneti',
															"Danyil 'Dan' Pysmak",
															'Amulya Angajala',
															"Mingyao 'Terry' Tao"
														]}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<div className="update ml-auto mr-auto">
												<Button className="btn-round" color="primary" onClick={{}}>
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
