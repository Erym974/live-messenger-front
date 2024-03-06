import React, { useState } from 'react'

import './home.scss'
import { useTranslation } from 'react-i18next'
import axios from '../../Api/axios'
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '../../Components/Public/Navbar'
import { Footer } from '../../Components/Public/Footer';
import toast from 'react-hot-toast';

export const Blog = () => {

  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const { data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
        const response = await axios.get('/blog/posts')
        if(response?.status) return response.datas
        setError(true)
        toast.error(t('error.occured'))
        return []
    }
  })

  const posts = data || []

  return (
    <section className="blog public blog-modal-open">
    <Navbar />
    <main>
      {!error ?
        !post ?
        <>
          <section id="blog">
            <h1>Blog</h1>
          </section>
          <section className="posts-container">
            {posts.map((post, index) => <article className="post" key={index}>
                <img src={post.image.path} alt={post.title} className="post-thumbnail" />
                <div className="post-preview">
                  <h2>{post.title}</h2>
                  <p>{post.short_description}</p>
                  <button type="button" className="btn" onClick={() => setPost(post)}>Read more</button>
                </div>
              </article>)}
          </section>
        </>  
        :
          <section className="post">
            <div className="post-back">
              <button className="" onClick={() => setPost(null)}>{t('general.back')}</button>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <img src={post.image.path} alt={post.title} className="post-image" />
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="post-back bottom">
              <button className="" onClick={() => setPost(null)}>{t('general.back')}</button>
            </div>
          </section>
      :
      <section className="error">
        <button onClick={refetch}>{t('error.reload')}</button>
      </section>
      }
    </main>
    <Footer />
    </section>
  )
}
