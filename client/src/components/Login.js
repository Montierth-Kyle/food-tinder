import React from 'react';
import { Header, Form, Button, Grid, Icon, Divider, Menu, Modal, Image } from 'semantic-ui-react';
import { authenticate } from '../actions/user';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../styles/main.css';
import background from '../images/mosaic_bg_medium.jpg';

var sectionStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${background})`,
    position: 'fixed',
    top: '0',
    left: '0'
};

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
    dispatch(authenticate( email, password, title, history))
  }

  render() {
    let { title } = this.props;
    let { email, password } = this.state;
    return (
      <div style={ sectionStyle }>
            <Modal dimmer={false} open>
                <Modal.Content>
                <Grid columns={16} relaxed centered>      
                    <Grid.Column width={10} verticalAlign="middle">
                        <Header as="h1" color='red'>{title}</Header>
                        <Form onSubmit={this.handleSubmit} size='huge'>
                                <Form.Field
                                    control='input'
                                    id="email"
                                    label='Email'
                                    required
                                    icon='mail'
                                    type="email"
                                    onChange={this.handleChange}
                                    value={email}
                                />
                                <Form.Field
                                    control='input'
                                    id="password"
                                    label="Password"
                                    required
                                    icon="vcard"
                                    type="password"
                                    onChange={this.handleChange}
                                    value={password}
                                />
                            <br />
                            <Button circular size='huge' color="green" >
                                <Icon name='checkmark' /> Submit
                            </Button>
                            <Divider hidden >Or Sign In With</Divider>
                            <Divider hidden />
                            <Button circular size='big' color='facebook' icon='facebook' />
                            <Button circular size='big' color='twitter' icon='twitter' />
                            <Button circular size='big' color='google plus' icon='google plus' />
                            <Button circular size='big' color='linkedin' icon='linkedin' />
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Divider vertical>OR</Divider>
                    </Grid.Column>
                    <Grid.Column width={5} verticalAlign="middle">
                        <Menu.Item>
                            <NavLink to='/register'>
                                <Button circular size='massive' color="green" ><Icon name='user plus' /> Sign Up</Button>
                            </NavLink>
                        </Menu.Item>
                    </Grid.Column>
                </Grid>
                </Modal.Content>
            </Modal>
      </div>
    )
  }
}

export default connect()(Login);