import {fetchPublicChannels } from '../../../../actions/thread_actions'
import {connect} from 'react-redux'
import Explore from './explore'

const mSTP = state => ({
  publicChannels: Object.values(state.workspace.publicChannels),
  usersChannels: state.workspace.threads
})

const mDTP = (dispatch) => ({
  fetchPublicChannels: () => dispatch(fetchPublicChannels())
})

export default connect(mSTP, mDTP)(Explore)