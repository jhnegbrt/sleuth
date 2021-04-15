import {RECEIVE_THREAD, RECEIVE_ALL_THREADS } from '../actions/thread_actions'


const threadsReducer = (state = {}, action) =>{
  Object.freeze(state)
    switch(action.type){
      case RECEIVE_THREAD:
        return Object.assign({}, state, {[action.thread.id]: action.thread})
      case RECEIVE_ALL_THREADS:
        return Object.assign({}, state, action.threads.threads)
      default:
        return state
  }
}

export default threadsReducer;