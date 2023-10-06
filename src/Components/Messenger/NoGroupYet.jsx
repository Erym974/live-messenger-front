import React, { useEffect } from 'react'

export const NoGroupYet = () => {
 
    return (
        <section id="no-group-yet" className='d-flex f-c aic jcc'>
            <h2 className='mt-5'>Il semble de tu n'as pas encore d'ami !</h2>
            <p className='mt-2 text-dark'>Pour commencer à discuter, tu peux ajouter des amis en cliquant sur le bouton ci-dessous.</p>
            <button className='btn btn-primary mt-4'>Ajouter des amis</button>
        </section>
    )
}
