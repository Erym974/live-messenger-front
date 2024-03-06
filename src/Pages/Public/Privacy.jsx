import React, { useEffect, useState } from 'react'

import './home.scss'
import { Navbar } from '../../Components/Public/Navbar'
import { Footer } from '../../Components/Public/Footer';
import { useQuery } from '@tanstack/react-query';
import axios from '../../Api/axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const Privacy = () => {

  const { t, i18n } = useTranslation()

  const { data, refetch } = useQuery({
    queryKey: ['privacy'],
    queryFn: async () => {
        const response = await axios.get('/api/legal-notices/privacy')
        if(response?.status) return response.datas
        toast.error(t('error.occured'))
        return []
    }
  })

  useEffect(() => {
    refetch()
  }, [i18n.language])

  return (
    <section className="privacy public">
    <Navbar />
    <main>
      <div className="privacy-content" dangerouslySetInnerHTML={{ __html: data?.content }}></div>
    </main>
    <Footer />
  </section>
  )
}
