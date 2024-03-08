import React, { useState } from 'react'

import './home.scss'
import { useTranslation } from 'react-i18next'
import axios from '../../Api/axios'
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '../../Components/Public/Navbar'
import { Footer } from '../../Components/Public/Footer';

export const Blog = () => {

  const [post, setPost] = useState(null)
  const { t } = useTranslation()

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
        const response = await axios.get('/blog/posts')
        if(response?.status) return response.datas
        return []
    }
  })

  const posts = data || []

  return (
    <section className="blog public blog-modal-open">
    <Navbar />
    <main>
      <section id="blog">
        <h1>Blog</h1>
      </section>
      {posts.length > 0 ?
        !post ?
        <>
          <section className="posts-container">
            {posts.map((post, index) => <article className="post" key={index}>
                <img src={post.image.path} alt={post.title} className="post-thumbnail" />
                <div className="post-preview">
                  <h2>{post.title}</h2>
                  <p>{post.short_description}</p>
                  <button type="button" className="btn" onClick={() => setPost(post)}>{t('general.readmore')}</button>
                </div>
              </article>)}
          </section>
        </>  
        :
          <section className="post">
            <div className="post-back mt-2">
              <button onClick={() => setPost(null)}>{t('general.back')}</button>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <img src={post.image.path} alt={post.title} className="post-image" />
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="post-back bottom">
              <button className="" onClick={() => setPost(null)}>{t('general.back')}</button>
            </div>
          </section>
      :
      <section className="empty">
        <h3 className="pt-2">{t('public.no_posts')}</h3>
      </section>
      }
    </main>
    <Footer />
    </section>
  )
}
