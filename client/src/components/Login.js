import React from 'react';
import { Header, Form, Button, Grid, Container, Icon, Segment, Divider, Image, Modal } from 'semantic-ui-react';
import { authenticate } from '../actions/user';
import { connect } from 'react-redux';

class Auth extends React.Component {
  defaults = { email: '', password: '' }
  state = { ...this.defaults }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, history, dispatch } = this.props;
    let { email, password } = this.state;
    dispatch(authenticate(email, password, title, history))
  }

  loginStyles = {
    margin: "auto",
    position: "absolute",
    top: "0", left: "0", bottom: "0", right: "0",
    width: "50%",
    height: "50%",
    padding: "40px"
  }

  render() {
    let { title } = this.props;
    let { email, password } = this.state;
    return (
      <div>
        <Modal open>
            <Modal.Content>
                <Grid columns={16} relaxed centered>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={5} verticalAlign="middle">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                id="email"
                                label="Email"
                                required
                                type="email"
                                onChange={this.handleChange}
                                value={email}
                            />
                            <Form.Input
                                id="password"
                                label="Password"
                                required
                                type="password"
                                onChange={this.handleChange}
                                value={password}
                            />
                        </Form>
                        <br />
                        <Button color="blue" icon="checkmark" ><Icon name='checkmark' /> Submit</Button>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Divider vertical>OR</Divider>
                    </Grid.Column>
                    <Grid.Column width={5} verticalAlign="middle">
                            <Button content='Sign Up' icon="user plus" color="green" ><Icon name='user plus' /> Sign Up</Button>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                </Grid> 
            </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default connect()(Auth);