import React, { useState } from 'react'
import '../style.scss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Login = () => {

    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setErr('User not found. Please check your credentials.');
            } else if (err.code === 'auth/invalid-email') {
                setErr('Invalid email. Please enter a valid email address.');
            } else if (err.code === 'auth/wrong-password') {
                setErr('Invalid password. Please enter the correct password.');
            } else {
                setErr('An error occurred during login. Please try again later.');
            }
        }
    }

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>Holo Chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <button>Sign In</button>
                    {err && <span style={{ color: 'red' }}>{err}</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login