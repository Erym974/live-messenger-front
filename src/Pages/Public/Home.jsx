import React, { useEffect } from 'react'

import './home.scss'
import { Navbar } from '../../Components/Public/Navbar'
import { Footer } from '../../Components/Public/Footer'
import useTranslation from '../../Hooks/useTranslation'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {

  const { t } = useTranslation()

  const sections = [
    { 
      title: t('public.block1_title'),
      description: t('public.block1_description'),
      image: "/ressources/landing-1.png"
    },
    { 
      title: t('public.block2_title'),
      description: t('public.block2_description'),
      image: "/ressources/landing-2.png"
    },
    { 
      title: t('public.block3_title'),
      description: t('public.block3_description'),
      image: "/ressources/landing-3.png"
    },
  ]

  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true
    })
  }, [])

  return (
    <section className="homepage public">
      <Navbar data-aos="fade-down" />
      <main>
        <section id="hero">
          <h1 data-aos="fade-down">Swift Chat</h1>
          <p data-aos="fade-up">{t('public.homeDescription')}</p>
        </section>
        {sections.map((section, index) => 
          <section className="block" key={index}>
            <img data-aos="fade-right" src={section.image} alt={section.title} />
            <div data-aos="fade-right" className="text">
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

