import React, { useContext } from 'react'
import arrow from '../images/arrow-back.svg'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { RiVideoChatFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { CgMoreVerticalAlt } from "react-icons/cg";

const Chat = () => {
  const { data } = useContext(ChatContext)
  console.log(data, 'data from chat');

  return (
    <div className="chat">
      {data.chatId !== "null" ? (
        <>
          <div className="chatInfo">
            <div className="rightMenu" >
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              <RiVideoChatFill className="icons" />
              <HiUsers className="icons" />
              <CgMoreVerticalAlt className="icons" />
            </div>
          </div>
          <Messages />
          <Input />
        </>
      ) : (
        <div className='infoStatement'>Select a user or search for one to start chatting!</div>
      )}
    </div>
  )
}

export default Chat