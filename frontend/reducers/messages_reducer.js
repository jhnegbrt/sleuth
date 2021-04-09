import {
  RECEIVE_MESSAGE, REMOVE_MESSAGE, RECEIVE_ALL_MESSAGES
} from '../actions/message_actions'


const MessagesReducer = (state = {}, action) => {
  // debugger
  Object.freeze(state)
  
  switch (action.type){
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, {[action.message.id]: action.message})
    case RECEIVE_ALL_MESSAGES:
      return Object.assign({}, state, action.messages)
    case REMOVE_MESSAGE:
      let nextState = Object.assign({}, state)
      delete nextState[action.messageId]
      return nextState;
    default:
      return state;
  }
}


export default MessagesReducer