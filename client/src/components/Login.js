import React from 'react';
import { Header, Form, Button, Grid, Container, Icon, Segment, Divider } from 'semantic-ui-react';
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
      <div style={{height: "500px"}}>
        <Container>
            <Grid columns={16} relaxed centered>
                <Grid.Column width={4}></Grid.Column>        
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
                    <Button color="blue" >Submit</Button>
                </Grid.Column>
                <Grid.Column width={1}>
                    <Divider vertical></Divider>
                </Grid.Column>
                <Grid.Column width={2} verticalAlign="middle">
                    <Button content='Sign Up' icon="shopping basket" color="green" >Sign Up</Button>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
            </Grid>
        </Container>  
      </div>
    )
  }
}

export default connect()(Auth);