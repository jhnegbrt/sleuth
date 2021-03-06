import { connect } from 'react-redux'
import {clearMessages} from '../../actions/message_actions'
import MessageIndex from './message_index'
import { receiveCurrentThread } from '../../actions/thread_actions'

const mSTP = (state) => ({
  messages: Object.values(state.workspace.messages).filter(message => message.channel_dms_id === state.ui.currentThread.id),
  stateThreadId: state.ui.currentThread.id
})

const mDTP = (dispatch) => ({
  receiveCurrentThread: (threadId) => dispatch(receiveCurrentThread(threadId)),
  clearMessages: () => dispatch(clearMessages())
})


export default connect(mSTP, mDTP)(MessageIndex)