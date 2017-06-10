import React from 'react';
import { Header, Form, Button, Grid, Icon, Divider, Menu, Modal } from 'semantic-ui-react';
import { authenticate } from '../actions/user';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../styles/main.css';

class Login extends React.Component {
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

  render() {
    let { title } = this.props;
    let { email, password } = this.state;
    return (
      <div>
        <Modal open>
            <Modal.Content>
            <Grid columns={16} relaxed centered>
                <Grid.Column width={4}></Grid.Column>        
                <Grid.Column width={4} verticalAlign="middle">
                    <Header as="h3">{title}</Header>
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
                    <br />
                    <Button color="blue" ><Icon name='checkmark' /> Submit</Button>
                    </Form>
                </Grid.Column>
                <Grid.Column width={1}>
                    <Divider vertical>OR</Divider>
                </Grid.Column>
                <Grid.Column width={3} verticalAlign="middle">
                    <Menu.Item>
                    <NavLink to='/register'>
                <Button color="green" ><Icon name='user plus' /> Sign Up</Button>
             </NavLink>
                    </Menu.Item>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
            </Grid>
            </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default connect()(Login);