import React, { Component } from "react";

export default class RoomList extends Component {

// componentDidMount(){
//   document.getElementById()
// }


  
  render() {
const orderedRooms =[...this.props.rooms].sort(((a,b)=>

a.id - b.id
))

orderedRooms.map((room)=>{

this.roomy=room
})

    return (
      <div className="rooms-list">

        <div className="container-fluid">

     
        <ul>
          <h3 style={{fontFamily:"Aguafina"}}>
            <u>
            Your Rooms:</u></h3>

          {this.roomy.map(room => {
              const active = (this.props.roomId==room.id) ? "active" : "";
        
            return (
              <li key={room.id} className={"room " + active}>
                <a
                  onClick={() => {
                    this.props.subscribeToRoom(room.id);
                  }}
                  href="#"
                >
                  {room.name}
                </a>
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    );
  }
}
