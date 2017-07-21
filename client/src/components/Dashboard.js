import React from 'react';
import { Modal, Button, Dropdown, Grid, Container, Card, Image, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getDietPreference, setDietPreference } from '../actions/dietPreference';
import Account from './Account';
import Game from './Game';
import { getRecipe } from '../actions/recipe';
import gameButtonImage from '../images/gameButtonImage.jpg';
import accountButtonImage from '../images/accountButtonImage.jpg'



class Dashboard extends React.Component {
  
  defaults = { viewHistory: false, gameStarted: false, value: "" }
  state = { ...this.defaults }

  componentDidMount() {
    let { dietPreference, dispatch } = this.props;
      dispatch(getDietPreference());
  }

  startGame = () => {
    this.setState({ gameStarted: true })
  }

  showHistory = () => {
    let history = this.props;
    this.setState({ viewHistory: true })

  }

  displayDietPreferences = () => {
  return this.props.dietPreference.map(diet => {
    return {  key: diet.id, id: diet.id, text: diet.name, value: diet.id }
  })
  }

  handleChange = (e, { value }) => { 
    this.setState({value});
    this.props.dispatch(setDietPreference(value))
  };


  render() {

    const square = { width: 175, height: 175 }

    if (this.state.gameStarted && !this.state.viewHistory ) {
      return (
        <Game id={this.state.value} />
      );
    } else if (this.state.viewHistory && !this.state.gameStarted ) {
        return (
          <Container>
            <Account/>
          </Container>
      );
    } else {
        return (
            <Grid columns={1}>
              <Grid.Column>
                <Card fluid>
                  <Image 
                    src={gameButtonImage}
                    as='a'
                    href='/game'
                    fluid 
                    onClick={this.startGame}
                  />
                  <div>
                  <Header as='h1' className='startGameText' inverted >In The Mood?</Header>
                  </div>
                  <Header as='h3' className='dietPrefsDropdown' inverted>
                    <Header.Content>
                      Diet Preference: {' '}
                      <Dropdown
                        upward
                        inline
                        header='Diet Preferences'
                        value={this.state.value}
                        options={this.displayDietPreferences()}
                        onChange={this.handleChange}
                      />
                    </Header.Content>
                  </Header>
                </Card>
                <Card fluid>
                  <Image
                    src={accountButtonImage}
                    as='a'
                    href='/account'
                    fluid
                  />
                  <div>
                    <Header as='h1' className='accountText' inverted >My Account</Header>
                  </div>
                </Card>
                {/*<Link to='/account'>
                  <Button color='red'>History</Button>
                </Link>*/}
              </Grid.Column>
            </Grid>
      );
    }
  };
}                

const mapStateToProps = (state) => {
  const { dietPreference: { dietPreference , id } } = state;
  return { dietPreference, id }
}
export default connect(mapStateToProps)(Dashboard);