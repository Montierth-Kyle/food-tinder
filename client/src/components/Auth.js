import React from 'react';
import { Header, Form, Button, Modal, Icon } from 'semantic-ui-react';
import { createUser } from '../actions/user';
import { connect } from 'react-redux';
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


class Auth extends React.Component {
  defaults = { email: '', password: '', firstName: '', lastName: '', }
  state = { ...this.defaults }

  handleChange = (e) => {
    let { target: { id, value } } = e;
    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, history, dispatch } = this.props;
    let { email, password, firstName, lastName, } = this.state;
    dispatch(createUser(email, password, firstName,lastName, title, history))
  }

  render() {
    let { title } = this.props;
    let { email, password, firstName, lastName, } = this.state;
    return (
      <div style={ sectionStyle }> 
        <Modal dimmer={false} open>
            <Modal.Content> 
            <Header textAlign='centered' as="h1" color='red' >{title}</Header>
            <Form className='signForm' size='huge' onSubmit={this.handleSubmit}>
              <Form.Input
                id="firstName"
                label="First Name"
                required
                icon="user circle"
                type="text"
                onChange={this.handleChange}
                value={firstName}
              />
              <Form.Input
                id="lastName"
                label="Last Name"
                required
                icon="user circle"
                type="text"
                onChange={this.handleChange}
                value={lastName}
              />
              <Form.Input
                id="email"
                label="Email"
                required
                icon="mail"
                type="email"
                onChange={this.handleChange}
                value={email}
              />
              <Form.Input
                id="password"
                label="Password"
                required
                icon="vcard"
                type="password"
                onChange={this.handleChange}
                value={password}
              />
              <Button size='massive' fluid color="green" >
                <Icon name='user plus' /> Sign Up
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default connect()(Auth);