import * as APIUtil from '../util/api/thread_api_util'
import { joinChannel, propagateThread } from '../util/action_cable_util/channel_util'

export const RECEIVE_CURRENT_THREAD = "RECEIVE_CURRENT_THREAD"
export const RECEIVE_ALL_THREADS = "RECEIVE_ALL_THREADS"
export const RECEIVE_THREAD = "RECEIVE_THREAD"
export const RECEIVE_PUBLIC_CHANNELS = "RECEIVE_PUBLIC_THREADS"
export const REMOVE_THREAD = "REMOVE_THREAD"

export const receiveCurrentThread = (threadId) => {
  return({
    type: RECEIVE_CURRENT_THREAD,
    threadId
  })
}

export const receiveThread = (thread) =>({
  type: RECEIVE_THREAD,
  thread
})

export const removeThread = thread => ({  
  type: REMOVE_THREAD,
  thread
})

export const receiveAllThreads = (threads) => {
  return({
    type: RECEIVE_ALL_THREADS,
    threads
  })
}

const receivePublicChannels = (channels) => {
  return({
    type: RECEIVE_PUBLIC_CHANNELS,
    channels
  })
}


export const createThread = (data, users, content) => dispatch => (
  APIUtil.createThread(data)
    .then(thread => {
      if(thread.channel === true){
        joinChannel(thread)
      } else {
        propagateThread(thread, users, content)
      }
      return thread
    })
    .then((thread) => dispatch(receiveCurrentThread(thread.id)))
    .fail((err)=>{
    })
)

export const fetchThreads = () => dispatch => (
  APIUtil.fetchThreads()
    .then((threads) => dispatch(receiveAllThreads(threads)))
)

export const fetchPublicChannels = () => dispatch =>(
  APIUtil.fetchPublicChannels()
    .then((channels) => dispatch(receivePublicChannels(channels)))
)