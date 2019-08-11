import React, { Component } from "react";
import "./App.css";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";
import Chatkit from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator } from "./config";

export default class App extends Component {
  state = {
    messages: [],
    joinableRooms: [],
    // joinedRooms: this.currentUser.rooms,
    joinedRooms: [],
    roomId: ""
  };

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "Liam",
      // key: "195b902d-f9d4-45fb-896a-6ef66a7a2563:N/c5AyEKcm1EUcADQm5gRT4O86N0l4r2+3WS5ZOTKJ8=",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;

        this.currentUser.rooms.map((room, key) => {
          if (key == 0) {
            this.setState(
              {
                roomId: room.id
              },
              () => {
                this.currentUser
                  .fetchMultipartMessages({
                    roomId: this.state.roomId,
                    // initialId: 42,
                    direction: "older",
                    limit: 10
                  })
                  .then(messages => {
                    this.setState({
                      messages: [...this.state.messages, messages]
                    });
                  })
                  .catch(err => {
                    console.log(`Error fetching messages: ${err}`);
                  });
              }
            );
          }
        });

        this.getRooms();
      })
      .catch(err => console.log(err, "the error in chat manager"));
  }

  subscribeToRoom = roomID => {
    this.setState({ messages: [] });

    this.currentUser
      .subscribeToRoom({
        roomId: roomID,
        // messageLimit: 22,
        hooks: {
          onNewMessage: message => {
            this.setState(
              { messages: [...this.state.messages, message] },
              () => {}
            );
          },
          onUserStartedTyping: user => {
            // console.log(user, "useeeeeerr");
          }
        }
      })
      .then(room => {
        this.setState(
          {
            roomId: room.id
          },

          () => {
            this.currentUser
              .fetchMultipartMessages({
                roomId: this.state.roomId,
                // initialId: 42,
                direction: "older",
                limit: 10
              })
              .then(messages => {
                this.setState({ messages: [...this.state.messages, messages] });
              })
              .catch(err => {
                console.log(`Error fetching messages: ${err}`);
              });
          }
        );

        this.getRooms();
      })
      .catch(err => console.log("subscribe to room error", err));
  };

  getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error in get rooms", err));
  };

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })

    this.currentUser
      .fetchMultipartMessages({
        roomId: this.state.roomId,
        // initialId: 42,
        direction: "newer",
        limit: 10
      })
      .then(messages => {
        this.setState({ messages: [messages] });
      })
      .catch(err => {
        console.log(`Error fetching messages: ${err}`);
      });
      console.log(this.state.messages)
  };

  createRoom = name => {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => {
        this.subscribeToRoom(room.id);
      })
      .catch(err => console.log(err, "create room error"));
  };

  render() {
    return (
      <div >
        
          <div className="row">
            <div className="col">
              <RoomList
                roomId={this.state.roomId}
                subscribeToRoom={this.subscribeToRoom}
                rooms={[...this.state.joinableRooms, this.state.joinedRooms]}
              />
            </div>
            <div className="col">
              <MessageList
                roomId={this.state.roomId}
                messages={this.state.messages}
              />
              <SendMessageForm
            disabled={!this.state.roomId}
            sendMessage={this.sendMessage}
          />
            </div>
          </div>
        

        <div className="container-fluid">
        <h2 style={{fontFamily:"Aguafina"}}>
            <u>
            Create Chat Rooms:</u></h2>
<div className="row">
<NewRoomForm createRoom={this.createRoom} />
</div>

        
       
        </div>
      </div>
    );
  }
}
