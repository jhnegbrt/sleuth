import {
  RECEIVE_MESSAGE, REMOVE_MESSAGE, RECEIVE_MESSAGES, CLEAR_MESSAGES
} from '../../actions/message_actions'
import { LOGOUT_CURRENT_USER } from '../../actions/session_actions'


const MessagesReducer = (state = {}, action) => {
  Object.freeze(state)
  let emptyState = Object.assign({})
  switch (action.type){
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, {[action.message.id]: action.message})
    case RECEIVE_MESSAGES:
      return Object.assign({}, state, action.messages)
    case REMOVE_MESSAGE:
      let nextState = Object.assign({}, state)
      delete nextState[action.message.id]
      return nextState;
    case CLEAR_MESSAGES:
      return emptyState
    case LOGOUT_CURRENT_USER:
      return emptyState
    default:
      return state;
  }
}


export default MessagesReducer