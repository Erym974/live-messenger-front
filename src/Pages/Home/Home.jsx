import React from 'react'

import './home.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Hooks/CustomHooks'

export default function Home() {

  const { user } = useAuth()

  const blocks = [
    { 
      title: "Je suis un titre",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://via.placeholder.com/300"
    },
    { 
      title: "Je suis un titre",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://via.placeholder.com/300"
    },
    { 
      title: "Je suis un titre",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://via.placeholder.com/300"
    },
  ]

  return (
    <div className="homepage">
      <nav>
        <h1>Messenger</h1>
        <div className="links">
            {!user ?
              <>
                <Link to="auth/login">Se connecter</Link>
                <Link to="auth/register">S'inscrire</Link>
              </>
            :
              <Link to="messenger">Messenger</Link>
            }
        </div>
      </nav>
      <main>
        <section id="landing">

        </section>
        {blocks.map((block, index) => 
          <section className='block'>
            <div className="d-flex">
              <div className="col-6">
                <h2>What is Lorem Ipsum?</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="col-6">
                <img src="https://via.placeholder.com/300" alt="placeholder" />
              </div>
            </div>
          </section>
        )}
      </main>
      <footer>

      </footer>
    </div>
  )
}

