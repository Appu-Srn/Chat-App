import React, { Component } from 'react'

export default class NewRoomForm extends Component {

state={
    roomName: ''
}


handleChange=(e)=>{
this.setState({
    roomName: e.target.value
})
}

handleSubmit=(e)=>{
e.preventDefault()
this.props.createRoom(this.state.roomName)
this.setState({roomName: ''})
}

    render() {
        return (
            <div className="new-room-form">
          <form onSubmit={this.handleSubmit} className="form-group">
<input
className="form-control"
value={this.state.roomName}
onChange={this.handleChange}
 placeholder="Create A Room" required type="text"/>


<button className="btn btn-success" id="create-room-btn" type="submit">Submit</button>


          </form>

            </div>
        )
    }
}
