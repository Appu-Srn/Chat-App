import React, { Component } from 'react'

export default class SendMessageForm extends Component {


state={
    message: ''
}

handleChange=(e)=>{
  
    this.setState({
        message: e.target.value
    })
    
}


handleSubmit=(e)=>{
 e.preventDefault()
 console.log(this.state.message,"execcc")
 this.props.sendMessage(this.state.message)
 this.setState({message:''})

    
}

    render() {

        return (
            <form 
            onSubmit={this.handleSubmit} className="form-group">


                <input className="form-control"
                disabled={this.props.disabled}
                onChange={this.handleChange}
                value={this.state.message}
                type="text" placeholder="Type your messages and hit enter"/>
            </form>
        )
    }
}
