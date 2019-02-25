import React, { Component } from 'react';
const uuidv4 = require('uuid/v4')

class Toggle extends Component {
  state = {
    on:false
  };
  
  toggle= () => {
      this.setState(prevstate => ({
          on:!prevstate.on
      }))
  }
  render() {
    const {children} = this.props

    return children (
        {
         on:this.state.on,
         toggle:this.toggle
        }
    )
    
  }
}

export default Toggle;
