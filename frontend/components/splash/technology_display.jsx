import React from 'react'

class TechnologyDisplay extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    // debugger
    return(
      <div>{this.props.tech}</div>
    )
  }
}

export default TechnologyDisplay