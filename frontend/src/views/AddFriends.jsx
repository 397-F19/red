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
import { addFriend } from '../apis';

class AddFriends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputEmail: ''
		};
	}

	onChangeFriendEmail = e => {
		this.setState({ inputEmail: e.target.value });
	};

	addButton = async () => {
		let owner = localStorage.getItem('uid');
		if (!owner) {
			alert('Please login!');
			return;
		}
		let ownerEmail = localStorage.getItem('email');
		let inputEmail = this.state.inputEmail.trim();
		if (ownerEmail === inputEmail) {
			alert("You can't add yourself");
			return;
		}
		const data = {
			email: this.state.inputEmail,
			uid: owner
		};
		await addFriend(data);
		this.setState({ inputEmail: '' });
	};

	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card className='card-user'>
								<CardHeader>
									<CardTitle tag='h5'>Add Friends</CardTitle>
								</CardHeader>
								<CardBody>
									<Form>
										<Row>
											<Col className='pr-1' md='9'>
												<FormGroup>
													<label>Your friend's email address</label>
													<Input
														placeholder='Enter here'
														type='text'
														onChange={this.onChangeFriendEmail}
														value={this.state.inputEmail}
													/>
												</FormGroup>
											</Col>
										</Row>

										<Row>
											<div className='update ml-auto mr-auto'>
												<Button
													className='btn-round'
													color='primary'
													onClick={() => this.addButton()}
												>
													Add!
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

export default AddFriends;
