import React from 'react'
import {connect} from 'react-redux'
import Splash from './splash'
import { logout } from '../../actions/session_actions'


const mSTP = ({workspace: {users}, session}) => ({
  currentUser: users[session.id]
})

const mDTP = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(Splash)