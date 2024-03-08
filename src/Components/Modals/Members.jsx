import React from 'react'
import useModal from '../../Hooks/useModal'
import useTranslation from '../../Hooks/useTranslation'
import { useNavigate } from "react-router-dom";
import { FaCrown, FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import useAuth from '../../Hooks/useAuth';
import useProfile from '../../Hooks/useProfile';
import { Tooltip } from 'react-tooltip';
import useMessenger from '../../Hooks/useMessenger';

export default function Members() {

    const { t } = useTranslation()
    const { closeModal, params } = useModal()
    const { showProfile } = useProfile();
    const { kickUser, promoteUser, group } = useMessenger()
    const { user } = useAuth()
    const navigate = useNavigate();

    const handleProfile = (id) => showProfile(id)

    const handleKick = (id) => kickUser(id)
    const handlePromote = (id) => promoteUser(id)

  return (
    <>
        <div className="modal-body">
            <h2 className='text-center'>{t('global.membersList')}</h2>
            <Tooltip id="tooltip" data-tooltip-offset="55" data-tooltip-place="top" />
            <table className="w-100 my-3">
                <tbody>
                    {group?.members?.map((member, index) => 
                    <tr className="d-flex aic jcb text-dark pb-1 mb-3 border-bottom" key={member.id}>
                        <td>{member.fullname}</td>
                        <td className="d-flex aic jcc g-10">
                            {member?.id != user.id && 
                                <>
                                    <FaUser data-tooltip-id="tooltip" data-tooltip-content={t('profile.see')} className={"clickable"} onClick={() => { handleProfile(member.id) }} />
                                    {group?.administrator?.id == user.id && 
                                    <>
                                        <IoLogOut data-tooltip-id="tooltip" data-tooltip-content={t('global.kick')} className={"clickable"} onClick={() => {handleKick(member.id)}} />
                                        <FaCrown data-tooltip-id="tooltip" data-tooltip-content={t('global.promote')} className={"clickable"} onClick={() => {handlePromote(member.id)}} />
                                    </>
                                    }
                                </>
                            }
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>

            <hr className="my-3" />
        </div>
        <div className="modal-footer d-flex g-5 jce">
            <button className="bg-danger" onClick={closeModal}>{(t('modal.cancel'))}</button>
        </div>
    </>
  )
}
