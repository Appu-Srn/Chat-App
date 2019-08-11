import React, { Component } from 'react'

export default function Message(props) {
 
        return (
            <div  className="message">
                <div className="message-username badge badge-secondary">
                    {props.username}
                    
                </div>
                <div style={{fontFamily:"Oswald"}}>
                    {props.text[0].payload.content}
                </div>
        
                
            </div>
        )
    
}
