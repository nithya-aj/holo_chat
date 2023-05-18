import React, { useContext, useEffect, useRef } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { AiOutlineLogout } from "react-icons/ai";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const avatarRef = useRef(null);

  useEffect(() => {
    tippy(avatarRef.current, {
      content: `
        <div>
          <p>Name: ${currentUser.displayName}</p>
          <p>Email: ${currentUser.email}</p>
        </div>
      `,
      allowHTML: true,
    });
  }, [currentUser]);
  
  console.log(currentUser, 'currentUser');
  return (
    <div className='navItems'>
      <div className="logo">
        Holo Chat
      </div>
      <div className="user">
        <img className='avatar' src={currentUser.photoURL} alt="" ref={avatarRef} />
        <AiOutlineLogout className='logout' onClick={() => signOut(auth)} />
      </div>
    </div>
  )
}

export default Navbar