import React from 'react';
import { Modal, Button, Dropdown, Grid, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDietPreference } from '../actions/dietPreference'


class Dashboard extends React.Component {
  
  defaults = { gameStarted: false, value: "" }
  state = { ...this.defaults }

  componentDidMount() {
    let { dietPreferences, dispatch } = this.props;
      dispatch(getDietPreference())
    }

  startGame = () => {
    this.setState({ gameStarted: true })
  }

  displayDietPreferences = () => {
  return this.props.dietPreferences.map(diet => {
    return {  id: diet._id, text: diet.dietName, value: diet.dietName }
  })
  }

  handleChange = (e, { value }) => this.setState({ value });


  render() {

    return (
        <div>
          <Container>
            <Grid columns={2}>
              <Grid.Column>
                <Button inverted color='orange' onClick={this.startGame} >Start Game</Button>
                <Dropdown placeholder='Diet Preferences' value={this.state.value} fluid selection options={this.displayDietPreferences()} onChange={this.handleChange} />
              </Grid.Column>
              <Grid.Column>
                <Button inverted color='red'>History</Button>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    )
  }};

const mapStateToProps = (state) => {
  return { dietPreferences: state.dietPreference }
}
export default connect(mapStateToProps)(Dashboard);