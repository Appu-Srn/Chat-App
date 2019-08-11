import React, { Component, Fragment } from 'react'
import Message from './Message';
import ReactDom from 'react-dom'
// const DUMMY_DATA = [
//     {
//         senderId: 'perborgen',
//         text:'hey, how is it going?'
//     },
//     {
//         senderId: 'Janedon',
//         text:'great, how about you?'
//     },
//     {
//         senderId: 'perborgen',
//         text:'good to hear from you'
//     },
// ]



export default class MessageList extends Component {


    componentWillUpdate(){
        const node = ReactDom.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight+100 >= node.scrollHeight
    }

componentDidUpdate(){


    if(this.shouldScrollToBottom){
        const node = ReactDom.findDOMNode(this)
        node.scrollTop = node.scrollHeight;
    }



}

    render() {

        if(!this.props.roomId){
            return(
              <div className="message-list">
                  <div className="join-room">
                      Please wait while we load your chats
                  </div>
              </div>
            )
          }

        return (
            <Fragment>
            <div className="message-list">
                {this.props.messages.map((message, index)=>{


return(
    <div key={index}>
    <h3 style={{fontFamily:"Aguafina"}}>
        <u>
        Chats:</u></h3>
{message.map((mess, i)=>{

                    return(
< Fragment key={i}>
                        <Message  username={mess.senderId} text={mess.parts}/>
                        <br/>
                        </Fragment > 
                    )
})}
</div>
)
                  
                })}
                
            </div>
            </Fragment>
        )
    }
}
