import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import moment from 'moment'

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    console.log(message, 'message');

    const formatDuration = (duration) => {
        if (duration < 1) {
            return 'just now';
        } else if (duration < 60) {
            return `${Math.floor(duration)}m`;
        } else if (duration < 1440) {
            return `${Math.floor(duration / 60)}h`;
        } else {
            return '1d+';
        }
    };

    const formatDate = (date) => {
        const now = moment();
        const messageDate = moment(date);
        const diffMinutes = now.diff(messageDate, 'minutes');
        const formattedDuration = formatDuration(diffMinutes);

        if (diffMinutes < 1) {
            return 'just now';
        } else if (now.diff(messageDate, 'days') === 1) {
            return 'yesterday';
        } else if (now.diff(messageDate, 'days') > 1) {
            return messageDate.format('MMM DD, YYYY');
        } else {
            return `${formattedDuration} ago`;
        }
    };


    const formattedDate = formatDate(message.date.toDate());

    return (
        <>
            <div className={`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
                <div className="messageInfo">
                    <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                    <span>{formattedDate}</span>
                </div>
                <div className="messageContent">
                    {message.img &&
                        <img src={message.img} alt="" />
                    }
                    {message.text ? (<p>{message.text}</p>) : " "}
                </div>
            </div>
        </>
    )
}

export default Message