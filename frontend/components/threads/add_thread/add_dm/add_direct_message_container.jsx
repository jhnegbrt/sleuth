import AddDirectMessage from './add_direct_message'
import {connect} from 'react-redux'

const mSTP = state => ({
  threads: Object.values(state.entities.threads)
})

const mDTP = dispatch => ({

})

export default connect(mSTP, mDTP)(AddDirectMessage)