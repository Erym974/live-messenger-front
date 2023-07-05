import { useState } from 'react'
import './authentification.scss'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Register() {

  const [datas, setDatas] = useState({email: "", password: "", confirmPassword: ""});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(datas.password != datas.confirmPassword) return toast.error('Your password does not match');


  }

  const handleChange = (evt, key) => setDatas({...datas, [key]: evt.target.value});

  return (
    <section id="register">
      <div className="container">
        <header>
          <h1>Signup</h1>
        </header>
        <main>
          <form id="register-form" action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" name="email" id="email" value={datas.email} onChange={(evt) => { handleChange(evt, 'email') }} placeholder=' ' />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" value={datas.password} onChange={(evt) => { handleChange(evt, 'password') }} placeholder=' ' />
              <label htmlFor="password">Create password</label>
            </div>
            <div className="form-group">
              <input type="password" name="confirm-password" id="confirm-password" value={datas.confirmPassword} onChange={(evt) => { handleChange(evt, 'confirmPassword') }} placeholder=' ' />
              <label htmlFor="confirm-password">Confirm password</label>
            </div>
          </form>
        </main>
        <footer>
          <input type="submit" form="register-form" value="Signup" />
          <span>Already have an account? <Link to="/auth/login">Login</Link></span>
        </footer>
      </div>
    </section>
  )
}
