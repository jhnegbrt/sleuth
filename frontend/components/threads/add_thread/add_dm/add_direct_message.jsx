import React from 'react'
import MessageIndexContainer from '../../../messages/message_index_container'
import Close from '../../../../../app/assets/images/close.svg'

class AddDirectMessage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedUsers: [props.currentUser],
      newMember: "",
      currentDm: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount(){
    this.props.fetchAllUsers()
  }

  handleChange(e){
    this.setState({
      newMember: e.target.value
    })
  }

  removeUser(userId){
    let users = this.state.selectedUsers.filter(function(id){
      return id !== userId
    })
    this.setState({
      selectedUsers: users
    })
  }

  handleKeyDown(e){
    
    if (["Enter", "Tab", ","].includes(e.key)){
      e.preventDefault()
      let newMember = this.state.newMember.trim()
      const {users} = this.props
      for (const key in users){
        if(users[key].username === newMember  && !this.state.selectedUsers.includes(users[key].id))
        this.setState({
          selectedUsers: [...this.state.selectedUsers, users[key].id],
          newMember: ""
        })
      }
    }
  }

  sameUsers(threadUsers, stateUsers){
    let dictionary = {}
    threadUsers.forEach((id) =>{
      return dictionary[id] = 1
    })
    for (let i = 0; i < stateUsers.length; i++){
      if (dictionary[stateUsers[i]] === undefined){
        return false
      } else {
        dictionary[stateUsers[i]]--
      }
    }
    if (Object.values(dictionary).every((el)=> el === 0)){
      return true
    } else{
      return false
    }
  }

  checkUsers(dms, stateUsers){

    let match = null;
    for (let i = 0; i < dms.length; i++){
      let users = dms[i].users
      let sameUsers = this.sameUsers(users, stateUsers)
      if ( sameUsers ){
        return match = dms[i].id
      }
    }
    return match
  }

  componentDidUpdate(){

    let {threads} = this.props
    let dms = threads.filter((el) => { return el.channel === false})
    let match = this.checkUsers(dms, this.state.selectedUsers)
    
    if (this.state.currentDm !== match){
      this.setState({
        currentDm: match
      })
    }
  }

  //add autocomplete for users

  render(){
    const {users} = this.props
    const selectedUsers = this.state.selectedUsers
    return(
      <div className="add-dm-container">
        <div className="add-dm-header">
          <h2>New Direct Message</h2>
        </div>
        <div className="add-dm">
          <h2>To:</h2>
          <ul className="recipients-list">
            {selectedUsers.map(id =>{
              if( id !== this.props.currentUser){
                return <li key={id}>
                  {users[id].username}
                <a onClick={()=>this.removeUser(id)}><img className="remove-new-member-button" 
                src={Close}></img></a></li>
              }
            })}
            <input
            autoFocus
            className="new-member-input"
            value={this.state.newMember}
            placeholder= {this.state.selectedUsers.length === 1 ? "Enter Username to add Member!" :""}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            />
          </ul>
        </div>
        
        <MessageIndexContainer 
        searchDmId={this.state.currentDm}
        selectedUsers={this.state.selectedUsers} />

      </div>
    )
  }
}

export default AddDirectMessage