import React from 'react';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	FormGroup,
	Form,
	Input,
	Row,
	Col
} from 'reactstrap';

/*
	Use "getUserInfo(localStorage.getItem('uid'))" to retreive the user object
	Use getUserFriends(/friends/uid, localStorage.getItem('uid')) to retreive the user's list of friends.

*/


class User extends React.Component {
	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='4'>
							<Card className='card-user'>
								<div className='image'>
									<img
										alt='...'
										src={require('assets/img/damir-bosnjak.jpg')}
									/>
								</div>
								<CardBody>
									<div className='author'>
										<img
											alt='...'
											className='avatar border-gray'
											src={require('assets/img/mike.jpg')}
										/>
										<h5 className='title'>Aaron Kaneti</h5>
										<p className='description'>aaronkaneti@gmail.com</p>
									</div>
									{/* <p className="description text-center">
										"I like the way you work it <br />
										No diggity <br />I wanna bag it up"
									</p> */}
								</CardBody>
								<CardFooter>
									<hr />
									<div className='button-container'>
										<Row>
											<Col className='ml-auto' lg='3' md='6' xs='6'>
												<h5>
													12 <br />
													<small>Events</small>
												</h5>
											</Col>
											<Col className='ml-auto mr-auto' lg='4' md='6' xs='6'>
												<h5>
													200 <br />
													<small>Friends</small>
												</h5>
											</Col>
											{/* <Col className="mr-auto" lg="3">
												<h5>
													24,6$ <br />
													<small>Spent</small>
												</h5>
											</Col> */}
										</Row>
									</div>
								</CardFooter>
							</Card>
						</Col>
						<Col md='8'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>My Friends</CardTitle>
								</CardHeader>
								<CardBody>
									<ul className='list-unstyled team-members'>
										<li>
											<Row>
												<Col md='2' xs='2'>
													<div className='avatar'>
														<img
															alt='...'
															className='img-circle img-no-padding img-responsive'
															src={require('assets/img/faces/ayo-ogunseinde-2.jpg')}
														/>
													</div>
												</Col>
												<Col md='7' xs='7'>
													Mingyao 'Terry' Tan <br />
													<span className='text-muted'>
														<small>mingyaotan@gmail.com</small>
													</span>
												</Col>
												<Col className='text-right' md='3' xs='3'>
													<Button
														className='btn-round btn-icon'
														color='success'
														outline
														size='sm'
													>
														<i className='fa fa-envelope' />
													</Button>
												</Col>
											</Row>
										</li>
										<li>
											<Row>
												<Col md='2' xs='2'>
													<div className='avatar'>
														<img
															alt='...'
															className='img-circle img-no-padding img-responsive'
															src={require('assets/img/faces/joe-gardner-2.jpg')}
														/>
													</div>
												</Col>
												<Col md='7' xs='7'>
													Bradley Ramos
													<br />
													<span className='text-muted'>
														<small>bradleyramos@gmail.com</small>
													</span>
												</Col>
												<Col className='text-right' md='3' xs='3'>
													<Button
														className='btn-round btn-icon'
														color='success'
														outline
														size='sm'
													>
														<i className='fa fa-envelope' />
													</Button>
												</Col>
											</Row>
										</li>
										<li>
											<Row>
												<Col md='2' xs='2'>
													<div className='avatar'>
														<img
															alt='...'
															className='img-circle img-no-padding img-responsive'
															src={require('assets/img/faces/joe-gardner-2.jpg')}
														/>
													</div>
												</Col>
												<Col md='7' xs='7'>
													Amulya Angajala
													<br />
													<span className='text-muted'>
														<small>aangajala@gmail.com</small>
													</span>
												</Col>
												<Col className='text-right' md='3' xs='3'>
													<Button
														className='btn-round btn-icon'
														color='success'
														outline
														size='sm'
													>
														<i className='fa fa-envelope' />
													</Button>
												</Col>
											</Row>
										</li>
										<li>
											<Row>
												<Col md='2' xs='2'>
													<div className='avatar'>
														<img
															alt='...'
															className='img-circle img-no-padding img-responsive'
															src={require('assets/img/faces/clem-onojeghuo-2.jpg')}
														/>
													</div>
												</Col>
												<Col className='col-ms-7' xs='7'>
													Danyil Pysmak <br />
													<span className='text-muted'>
														<small>danpysmak@gmail.com</small>
													</span>
												</Col>
												<Col className='text-right' md='3' xs='3'>
													<Button
														className='btn-round btn-icon'
														color='success'
														outline
														size='sm'
													>
														<i className='fa fa-envelope' />
													</Button>
												</Col>
											</Row>
										</li>
									</ul>
								</CardBody>
							</Card>
						</Col>
						{/* <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="Creative Code Inc."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue="michael23"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="Email" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue="Chet"
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue="Faker"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Melbourne"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Australia"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            type="textarea"
                            defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col> */}
					</Row>
				</div>
			</>
		);
	}
}

export default User;
