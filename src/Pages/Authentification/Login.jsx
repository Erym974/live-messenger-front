import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {

  const [datas, setDatas] = useState({ email: "", password: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    
  }

  const handleChange = (evt, key) => setDatas({ ...datas, [key]: evt.target.value });

  return (
    <section id="login">
      <div className="container">
        <header>
          <img src="/ressources/profile_picture.jpg" alt="" />
          <h1>Login</h1>
        </header>
        <main>
          <form id="login-form" action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" name="email" id="email" value={datas.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" value={datas.password} onChange={(evt) => { handleChange(evt, 'password') }} placeholder=' ' />
              <label htmlFor="password">Password</label>
            </div>
          </form>
        </main>
        <footer>
          <input type="submit" form="login-form" value="Login" />
          <span>Don't have an account? <Link to="/auth/register">Signup</Link></span>
        </footer>
      </div>
    </section>
  )
}
