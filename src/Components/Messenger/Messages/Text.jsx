import { FaArrowTurnDown } from "react-icons/fa6";
import useSettings from "../../../Hooks/useSettings";
import { Options } from "../Options";
import { Reactions } from "../Reactions";

export const Text = ({ message, type, option }) => {

  const { isMobileView } = useSettings()

  return (
    <div className={`message ${type} ${option ? 'option' : ''} ${message.me ? "me" : "participant"} ${(["bottom", "both"].includes(message.position)) ? "mb-2" : ""}`} data-message={message.id}>
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
                {message.content}
                {<Reactions message={message} />}
            </div>
            {!isMobileView && <Options message={message} />}
          </div>
        </div>
    </div>
  );
};