import React from 'react'

import './home.scss'
import { Navbar } from '../../Components/Public/Navbar'
import { Footer } from '../../Components/Public/Footer'
import useTranslation from '../../Hooks/useTranslation'

export default function Home() {

  const { t } = useTranslation()

  const sections = [
    { 
      title: t('public.block1_title'),
      description: t('public.block1_description'),
      image: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/6582c18a9cff186bd3731704_Create%20an%20invite-only%20place%20where%20you%20belong.svg"
    },
    { 
      title: t('public.block2_title'),
      description: t('public.block2_description'),
      image: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/6582c1b717efff2306ef179e_Where%20hanging%20out%20is%20easy.svg"
    },
    { 
      title: t('public.block3_title'),
      description: t('public.block3_description'),
      image: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/6582c1d8348e5c81ca608138_From%20few%20to%20a%20fandom.svg"
    },
  ]

  return (
    <section className="homepage public">
      <Navbar />
      <main>
        <section id="hero">
          <h1>Swift Chat</h1>
          <p>{t('public.homeDescription')}</p>
        </section>
        {sections.map((section, index) => 
          <section className="block" key={index}>
            <img src={section.image} alt={section.title} />
            <div className="text">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </section>
  )
}

