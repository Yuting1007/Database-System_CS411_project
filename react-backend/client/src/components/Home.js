import React, { Component } from 'react';
import NavBar from './NavBar';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
  } from "react-router-dom";

class StudentHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            s_name: sessionStorage.getItem('s_name') + '!',
            s_id: sessionStorage.getItem('s_id'),
            redirect_settings: false,
            redirect_settings_link: '/settings', 
            isPreferenceModalOpen: false,

            //preference info
            preference_major: 'None',
            preference_edu_level: 'None',
            preference_gender: 'None',
            preference_pastEx: 'None',
            preference_rating: 'None',

            //recommendation
            rec_tutors: [],
            isRecommendListModalOpen: false
        };
        this.onMatchButtonClick = this.onMatchButtonClick.bind();
        this.togglePreferenceModal = this.togglePreferenceModal.bind();
        this.toggleRecommendListModal = this.toggleRecommendListModal.bind();
    }

    //this.toggleRedirect_settings = this.toggleRedirect_settings.bind();

    async componentDidMount() {
        this.state.s_name = sessionStorage.getItem('s_name')
    }

    toggleRecommendListModal = () => {
        this.setState({
            isRecommendListModalOpen: !this.state.isRecommendListModalOpen
        })
    }

    togglePreferenceModal = () => {
        this.setState({
            isPreferenceModalOpen: !this.state.isPreferenceModalOpen
        })
    }

    onMatchButtonClick = () => {
        this.props.history.push('/matches')
    }

    redirectToSetting = () => {
        this.setState({
            redirect_settings: !this.state.redirect_settings
        })
    }

    handlePreferenceChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    recommend = (e) => {
        e.preventDefault();
        let formResults = {
            preference_major: this.state.preference_major,
            preference_edu_level: this.state.preference_edu_level,
            preference_gender: this.state.preference_gender,
            preference_pastEx: this.state.preference_pastEx,
            preference_rating: this.state.preference_rating
        }
        if (formResults.preference_major === '') {
            formResults.preference_major = 'None'
        }
        if (formResults.preference_rating === '') {
            formResults.preference_rating = 'None'
        }
        console.log(formResults)

        //POST req here
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formResults})
        };

        fetch('/matches/recommend', requestOptions)
        .then(res => res.json())
        .then(rec_tutors => {
            console.log(rec_tutors)
            this.setState({ rec_tutors })
            this.toggleRecommendListModal();
        });
    }

    render() {
        if (this.state.redirect_settings) {
            return <Redirect to={this.state.redirect_settings_link} />
        }
        
        return (
            <React.Fragment>
            
                <div>
                    <p>  eduFY</p>
                    <Nav tabs>
                        <NavItem>
                        <NavLink href="/student/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/matches">Matches</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/settings">Settings</NavLink>
                        </NavItem>
                    </Nav>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Welcome, {this.state.s_name}</h1>
                                    <p>
                                        Your student ID is {this.state.s_id}
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </div>

                <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                            <p>
                                <Button color="primary" size="lg" onClick={this.onMatchButtonClick} block>Matches</Button>
                            </p>
                                
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                            <p>
                                <Button color="primary" size="lg" onClick={this.togglePreferenceModal} block>Recommend Tutors</Button>
                            </p>
                            </Col>
                        </Row>

                        <Modal isOpen={this.state.isPreferenceModalOpen} toggle={this.togglePreferenceModal} >
                            <ModalHeader toggle={this.togglePreferenceModal}>Fill out this preference list and click recommend!</ModalHeader>
                            <ModalBody>
                            <Form onSubmit={this.recommend}>
                                <FormGroup>
                                    <Label for="preference_major">Your preference on tutor's major</Label>
                                    <Input type="text" name="preference_major" id="preference_major" onChange={e => this.handlePreferenceChange(e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="preference_edu_level">Your preference on education level</Label>
                                    <Input type="select" name="preference_edu_level" id="preference_edu_level" onChange={e => this.handlePreferenceChange(e)}>
                                        <option>None</option>
                                        <option>Elementary School</option>
                                        <option>Middle School</option>
                                        <option>High School</option>
                                        <option>College</option>
                                        <option>Master</option>
                                        <option>PhD</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="preference_gender">Your preference on tutor's gender</Label>
                                    <Input type="select" name="preference_gender" id="preference_gender" onChange={e => this.handlePreferenceChange(e)}>
                                        <option>None</option>
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="preference_pastEx">Do you want us to consider your past matching experience? </Label>
                                    <Input type="select" name="preference_pastEx" id="preference_pastEx" onChange={e => this.handlePreferenceChange(e)}>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                          <Label for="preference_rating">Minimum Rating (Blank if you have no preference on rating)</Label>
                                          <Input type="number" name="preference_rating" id="tutor_regi-preference_rating" onChange={e => this.handlePreferenceChange(e)} />
                                        </FormGroup>
                                <Button color="primary" type="submit">Give me recommendations!</Button> {' '}
                                <Button color="secondary" onClick={this.togglePreferenceModal}>Cancel</Button>
                            </Form>
                            </ModalBody>

                            
                        </Modal>

                        <Modal size='lg' isOpen={this.state.isRecommendListModalOpen} toggle={this.toggleRecommendListModal}>
                                  <ModalHeader toggle={this.toggleRecommendListModal}>Here are our recommended tutors for you!</ModalHeader>
                                  <ModalBody>
                                    <Table striped className="tutors-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Rating</th>
                                                <th>Education</th>
                                                <th>Major</th>
                                                <th>Phone Number</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.rec_tutors.map(tutor => 
                                            <tr key={tutor.t_id}>
                                                <td className="id-col">{tutor.t_id}</td>
                                                <td>{tutor.t_name}</td>
                                                <td>{tutor.t_ratings}</td>
                                                <td>{tutor.t_edu_level}</td>
                                                <td>{tutor.t_major}</td>
                                                <td>{tutor.t_pnum}</td>
                                                <td>{tutor.t_email}</td>
                                                <td><Button id={tutor.t_id} onClick={this.onStudentToTutorMatchClick}>Match!</Button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                  </ModalBody>

                                  <ModalFooter>
                                      <Button 
                                        color="primary" 
                                        onClick={this.toggleRecommendListModal}
                                        >Done
                                      </Button>
                                  </ModalFooter>
                                </Modal>
                    </Container>
                </Jumbotron>
                </div>
            </React.Fragment>
        );
    }
}

export default StudentHome;