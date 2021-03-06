import ThreadIndexItem from './thread_index_item'
import {connect} from 'react-redux'
import { receiveCurrentThread } from "../../../actions/thread_actions"
import {receiveMessage, removeMessage, receiveMessages} from '../../../actions/message_actions'
import { fetchAllUsers } from '../../../actions/user_actions'


const mSTP = (state) => {
  return{
  currentUserId: state.session.id,
  users: state.workspace.users,
}}

const mDTP = dispatch => ({
  selectThread: (threadId) => dispatch(receiveCurrentThread(threadId)),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  receiveMessages: (messages) => dispatch(receiveMessages(messages)),
  removeMessage: (messageId)=> dispatch(removeMessage(messageId)),
  fetchAllUsers: () => dispatch(fetchAllUsers())

})

export default connect(mSTP, mDTP)(ThreadIndexItem)