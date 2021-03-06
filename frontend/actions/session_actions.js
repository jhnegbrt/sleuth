import * as APIUtil from '../util/api/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const CLEAR_SESSION_ERRORS = 'CLEAR_ERRORS'

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

const receiveErrors = (errors) => {
  return({
    type: RECEIVE_SESSION_ERRORS,
    errors
  })
}

export const clearSessionErrors = () => {
  return({
    type: CLEAR_SESSION_ERRORS,
  })
}

export const signup = formUser => dispatch => {
 return(
  APIUtil.signup(formUser).then(user => (
    dispatch(receiveCurrentUser(user))
  ), errors => (
    dispatch(receiveErrors(errors.responseJSON))
  ))
)
};

export const login = formUser => dispatch => (
  APIUtil.login(formUser).then(user => (
    dispatch(receiveCurrentUser(user))
  ), errors => (
    dispatch(receiveErrors(errors.responseJSON))
  ))
);

export const logout = () => dispatch => APIUtil.logout()
  .then(()=> dispatch(logoutCurrentUser()))
  // .fail((errors) => dispatch(receiveErrors(errors.responseJSON)))