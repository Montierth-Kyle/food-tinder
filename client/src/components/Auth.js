import React from 'react';
import { Header, Form, Button, Modal } from 'semantic-ui-react';
import { createUser } from '../actions/user';
import { connect } from 'react-redux';
import '../styles/main.css';


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
      <div> 
        <Modal open>
            <Modal.Content> 
            <Header as="h3">{title}</Header>
            <Form className='signForm' onSubmit={this.handleSubmit}>
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
              <hr />
              <Button color="green" >Sign Up</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default connect()(Auth);