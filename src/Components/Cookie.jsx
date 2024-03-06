import React from 'react'
import { useDispatch } from 'react-redux'
import { acceptCookie } from '../Slices/generalSlice'
import { Link } from 'react-router-dom'

export const Cookie = () => {

    const dispatch = useDispatch()

    return (
        <div className="cookies">
            <p>By using our site, you acknowledge that you have read and understand our <Link to="/privacy">Privacy Policy</Link> and our <Link to="/terms">Terms of Service</Link>.</p>
            <div className="actions">
                <button onClick={() => dispatch(acceptCookie())}>Agree</button>
                <a href="https://google.com" className="btn bg-danger">Decline</a>
            </div>
        </div>
    )
}
