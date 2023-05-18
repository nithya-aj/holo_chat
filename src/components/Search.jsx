import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import clear from '../images/clear.svg'

const Search = () => {
  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true); // user not found
        setUser(null); // reset the user state
      } else {
        const foundUser = querySnapshot.docs.find((doc) => {
          const user = doc.data();
          return user.displayName.toLowerCase() === userName.toLowerCase();
        });

        if (foundUser) {
          const user = foundUser.data();
          if (user.uid === currentUser.uid) {
            setErr(true); // can't chat with yourself
            setUser(null); // reset the user state
          } else {
            setUser(user);
            setErr(false);
          }
        } else {
          setErr(true); // user not found
          setUser(null); // reset the user state
        }
      }
    } catch (err) {
      setErr(true);
    }
  };



  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group exists or not
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    console.log(combinedId, 'combinedId');
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res.data(), 'res.data()');

      if (!res.exists()) {
        console.log('is res exists???');
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }
    dispatch({ type: "CHANGE_USER", payload: user });
    setUser(null);
    setUserName("")
  };

  const handleClear = () => {
    setUser(null);
    setUserName("")
    setErr(false)
  }

  console.log(user);
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search users here...' onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} value={userName} />
        <img src={clear} alt="" onClick={handleClear} />
      </div>
      {err && <span style={{ color: 'red', paddingLeft: '1rem' }}>User not found!</span>}
      {user &&
        (<div className="userChat" onClick={handleSelect} >
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>)}
    </div>
  )
}

export default Search