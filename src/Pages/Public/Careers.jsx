import React, { useEffect, useState } from 'react'

import './home.scss'

import axios from '../../Api/axios'
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../Components/Public/Navbar';
import { Footer } from '../../Components/Public/Footer';
import toast from 'react-hot-toast';

export const Careers = () => {

    const { data, refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const response = await axios.get('/jobs')
            if(response?.status) return response.datas
            setError(true)
            toast.error(t('error.occured'))
            return []
        }
    })

    const jobs = data || [];
    const [filters, setFilters] = useState([])
    const [filter, setFilter] = useState("")
    const [modal, setModal] = useState(null)
    const [error, setError] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        if(jobs.length === 0) return
        const categories = jobs.map(job => job.category)
        const uniqueCategories = [...new Set(categories)]
        setFilters(uniqueCategories)
    }, [jobs])

    const Card = (job, index) => {
        return (
            <div className="job" key={index} onClick={() => { setModal(job) }}>
                <h3>{job.title}</h3>
                <h4>{job.location}</h4>
                <p>{job.short_description}</p>
            </div>
        )
    }

    const Apply = () => {
        window.location.assign(`mailto:careers@swiftchat.fr?Subject=[Reference:${modal.id}]`);
        setModal(null)
    }

  return (
    <section className="careers public">
    <Navbar />
    <main>
        {!error ?
        <>
            <section id="careers">
                <h1>Careers</h1>
                <div className="filters">
                    <button className="filter" onClick={() => setFilter("")}>
                        <span>{t('public.all')}</span>
                    </button>
                    {filters.map((filter, index) =>
                        <button className="filter" key={index} onClick={() => setFilter(filter)}>
                            <span>{filter}</span>
                        </button>
                    )}
                </div>
            </section>
            <section className="jobs-container">
                {!filter ?
                    <>
                        {filters.filter(filter => filter !== "").map((filter, index) => 
                            <div className="category" key={index}>
                                <h2 className="my-4" >{filter}</h2>
                                <div className='jobs'>{jobs.filter(job => !filter || job.category === filter).map((job, index) => Card(job, index) )}</div>
                            </div>
                        )}
                    </>
                    :
                    <>
                        <div className="category">
                            <h2 className="my-4" >{filter}</h2>
                            <div className='jobs'>{jobs.filter(job => !filter || job.category === filter).map((job, index) => Card(job, index) )}</div>
                        </div>
                    </>
                }
            </section>
        </>
        :
        <section className="error">
            <button onClick={refetch}>{t('error.reload')}</button>
        </section>
        }
    </main>
    <Footer />
    {modal && <section className="modal">
        <div className="backdrop"></div>
        <div className="content">
            <h2>{modal.title}</h2>
            <p><span className='title'>Référence :</span> {modal.id}</p>
            <p><span className='title'>Location :</span> {modal.location}</p>
            <p><span className='title'>Description :</span> {modal.long_description}</p>
            <span className='title'>Requirements :</span>
            <ul>
                {modal.requirements?.map((requirement, index) => 
                    <li key={index}>{requirement}</li>
                )}
            </ul>
            <div className="actions">
                <button onClick={() => Apply()}>Apply</button>
                <button onClick={() => setModal(null)} className='bg-danger'>Close</button>
            </div>
        </div>
    </section>}
  </section>
  )
}
