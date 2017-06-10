import React from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

const Dashboard = ({ firstName }) => (
  <div>
    <Header as="h2">Welcome</Header>
    <Header as="h3">{firstName}</Header>
  </div>
)

const mapStateToProps = (state) => {
  return { ...state.user }
}

export default connect(mapStateToProps)(Dashboard);