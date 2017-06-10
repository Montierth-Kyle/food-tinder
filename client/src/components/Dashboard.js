import React from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

const Dashboard = ({ lastName, firstName }) => (
  <div>
    <Header as="h2">{firstName}</Header>
    <Header as="h3">{lastName}</Header>
  </div>
)

const mapStateToProps = (state) => {
  return { ...state.user }
}

export default connect(mapStateToProps)(Dashboard);