import React, { useEffect, useState } from 'react'
import useModal from '../../Hooks/useModal'
import { useAuth, useMessenger, useTranslation } from '../../Hooks/CustomHooks'

export default function CreateGroup() {

    const { closeModal, params } = useModal()
    const { reactToMessage } = useMessenger()
    const { user } = useAuth()
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState('all')

    const handleRemoveClick = () => {
        const reactionOfUser = params?.reactions?.find(reaction => reaction.users?.find(userReact => userReact.id == user.id))
        reactToMessage(params.id, reactionOfUser.content)
        closeModal()
    }

    const stylizedTabHeaderDiv = () => { 
        return { width: `calc(100% / ${params?.reactions.length + 1})`, textAlign: "center", cursor: "pointer" } 
    }

    return (
        <>
            <div className="modal-body">
                <h2 className='text-center'>{t('reactions.title')}</h2>
            
                <div className="tabs">
                    <div className="tab-header" style={{ height: 60, display: "flex", alignItems: "center" }}>
                        <div className="text-dark" style={stylizedTabHeaderDiv()} onClick={() => setActiveTab("all")}>
                            <span>{t('global.all')}</span>
                        </div>
                        {params?.reactions?.map((reaction, index) => 
                            <div key={`${index}-${reaction.content}-${reaction.count}`} className="text-dark" style={stylizedTabHeaderDiv()} onClick={() => setActiveTab(reaction.content)}>
                                <span>{reaction.content} {reaction.count}</span>
                            </div>
                        )}
                    </div>
                    <div className="tab-body">
                        {activeTab == "all" && <div className="active">
                            <ul>
                                {params?.reactions?.map(reaction => 
                                    reaction?.users?.map((userReact, index) =>
                                        <li key={index} style={{ display: "flex", marginBottom: 10, justifyContent: "space-between", alignItems: "center", cursor: user.id == userReact.id ? "pointer" : "click" }} onClick={() => { user.id == userReact.id && handleRemoveClick() }}>
                                            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                                                <img src={userReact.profilePicture} alt={userReact.username} style={{ height: 40, width: 40, borderRadius: "50%" }} />
                                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                    <span className="text-dark">{userReact.fullname}</span>
                                                    {user.id == userReact.id && <span className='text-muted'>{t('reactions.remove')}</span>}
                                                </div>
                                            </div>
                                            <span>{reaction.content}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>}

                        {params?.reactions?.map((reaction, index) => 
                            <div style={{ display: activeTab == reaction.content ? "block" : "none" }}>
                                <ul>
                                    {reaction?.users?.map((userReact, index) =>
                                        <li key={index} onClick={() => { user.id == userReact.id && handleRemoveClick() }} style={{ display: "flex", marginBottom: 10, justifyContent: "space-between", alignItems: "center", cursor: user.id == userReact.id ? "pointer" : "click" }}>
                                            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                                                <img src={userReact.profilePicture} alt={userReact.username} style={{ height: 40, width: 40, borderRadius: "50%" }} />
                                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                    <span className="text-dark">{userReact.fullname}</span>
                                                    {user.id == userReact.id && <span className='text-muted'>{t('reactions.remove')}</span>}
                                                </div>
                                            </div>
                                            <span>{reaction.content}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="my-3" />
            </div>
            <div className="modal-footer d-flex g-5 jce">
                <button className="bg-danger" onClick={closeModal}>{(t('modal.close'))}</button>
            </div>
        </>
    )
}
