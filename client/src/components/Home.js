import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

const Home = ({ firstName }) => (
  <div>
    <Header as="h3">
      { firstName ? `Welcome ${firstName}` : 'Welcome please sign in' }
    </Header> 
  </div>
)

const mapStateToProps = (state) => {
  return { firstName: state.user.firstName }
}

export default connect(mapStateToProps)(Home);