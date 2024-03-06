import { FaArrowTurnDown } from "react-icons/fa6";
import { FaTrash, FaPen } from "react-icons/fa";
import useSettings from "../../../Hooks/useSettings";
import { Options } from "../Options";
import { Reactions } from "../Reactions";
import useTranslation from "../../../Hooks/useTranslation";

export const Text = ({ message, type, option }) => {

  const { isMobileView } = useSettings()
  const { t } = useTranslation()

  return (
    <div className={(`message ${type} ${option ? 'option' : ''} ${message.me ? "me" : "participant"}${(["bottom", "both"].includes(message.position)) ? " mb-2" : ""}`).replaceAll('  ', ' ')} data-message={message.id} style={{ marginBottom: message.reactions.length > 0 ? "15px" : "0px" }}>
        {(!message.me && !option) && <div className="message-profile-picture">
            {(message.position === "bottom" || message.position === "both") && <img src={message.sender.profilePicture} className="message-profile-picture" />}
        </div>}
        <div className="message-body">
          {(message.reply && !option) && <div className="message-reply">
              <FaArrowTurnDown />
              <span>{message.reply.content}</span>
          </div>}
          <div className="message-content-container">
            <div className={`message-content ${type} ${message.position}`}>
                <p className={`message-text ${message?.deleted && 'deleted'} ${message?.edited && 'edited'}`}>
                  {message?.deleted && <FaTrash data-tooltip-id="tooltip" data-tooltip-content={t('message.deleted')} /> }
                  {(!message?.deleted && message?.edited) && <FaPen data-tooltip-id="tooltip" data-tooltip-content={t('message.edited')} /> }
                  {message?.deleted ? t('message.deleted') : message.content}
                </p>
                {message.reactions.length > 0 && <Reactions message={message} />}
                {!isMobileView && <Options message={message} />}
            </div>
          </div>
        </div>
    </div>
  );
};