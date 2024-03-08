import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import ButtonRounded from "../ButtonRounded";
import Messages from "./Messages";
import { toggleAside } from "../../Slices/settingsSlice";
import { openImages as openSliceImages } from "../../Slices/imagesSlices";
import { AiFillFileAdd, AiOutlinePicture } from "react-icons/ai";
import { PiGifFill } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { init } from "emoji-mart";

import "./chat.scss";
import {
  useAuth,
  useTranslation,
  useProfile,
  useMessenger,
  useCommands,
  useTheme,
  useSettings,
  useModal,
} from "../../Hooks/CustomHooks";
import { useIdle } from "@uidotdev/usehooks";
import GifPicker from "gif-picker-react";
import { socket } from "../../socket";

export default function Chat({ conversation }) {
  const [content, setContent] = useState("");
  const { executeCommand } = useCommands();
  const { isMobileView } = useSettings();
  const [limit, setLimit] = useState(0);
  const dispatch = useDispatch();
  const { t, language } = useTranslation();
  const easterIdle = useIdle((60 * 30) * 1000);
  const [files, setFiles] = useState([]);
  const { theme } = useTheme();
  const { openModal } = useModal()

  const [emoji, toggleEmoji] = useState();
  const [gif, toggleGif] = useState();

  const { user } = useAuth();
  const { sendMessage, messages, edition, reply, setReply, setEdition, editMessage, group } = useMessenger();

  /**
   *
   * Set focus on textarea
   *
   */
  useEffect(() => {
    init({ data });
    document.getElementById("textarea-writter")?.focus();
  }, []);

  /**
   * 
   * When the group changing reset all the values
   * 
   */
  useEffect(() => {
    setContent("")
    setReply()
    setEdition({active: false, id: null, content: null})
    setFiles([])
  }, [conversation])

  /**
   * 
   * When user is inactif since too much
   * 
   */
  useEffect(() => {
    if (easterIdle) executeCommand("/idle", false);
  }, [easterIdle, executeCommand]);

  /**
   *
   * Update the limit off the textarea
   *
   */
  useEffect(() => {
    if (edition?.active) setLimit(edition?.content.length);
    else setLimit(content?.length);
  }, [content, edition]);

  /**
   *
   * Set up the trigger for the emoji button
   *
   */
  useEffect(() => {
    if (!emoji) return;
    document.addEventListener("click", checkEmojiClick, true);
    return () => document.removeEventListener("click", checkEmojiClick, true);
  }, [emoji]);

  /**
   *
   * Set up the trigger for the Gif button
   *
   */
    useEffect(() => {
      if (!gif) return;
      document.addEventListener("click", checkGifClick, true);
      return () => document.removeEventListener("click", checkGifClick, true);
    }, [gif]);

  /**
   *
   * Check if the user click outside the emoji button
   *
   */
  const checkEmojiClick = (e) => {
    if (e.target.closest(".writter-emoji") === null && e.target.closest(".emoji") === null) return toggleEmoji(false);
  };

  /**
   *
   * Check if the user click outside the Gif button
   *
   */
  const checkGifClick = (e) => {
    if (
      e.target.closest(".writter-gif") === null &&
      e.target.closest(".gif") === null
    )
      toggleGif(false);
  };

/**
 * 
 * When a user click on a Gif 
 */
  const onGifClick = (gif) => {
    toggleGif(false);
    sendMessage(conversation?.id, `gif:${gif?.url}`);
    setReply(null);
  }

  /**
   *
   * Send new message
   *
   */
  const handleSendMessage = async (event = null, sendEmoji = false) => {
    if (!conversation) return

    if (edition.active) {
      if (edition.content.trim() < 1 || edition.content.length > 300) return;
      editMessage();
    } else {


      if (!sendEmoji) {
        if ((content.trim().length < 1 || content.length > 300) && files.length === 0) return;

        if (content.startsWith("/")) {
          const command = await executeCommand(content, true)
          if(!command) sendMessage(conversation?.id, content, []);
        } else {
          sendMessage(conversation?.id, content, files);
        }
      } else {
        sendMessage(conversation?.id, ":emoji:");
      }

      setContent("");
      setFiles([]);
      setReply(null);
    }
  };

  /**
   * 
   * Update the textarea size automatically
   * 
   */
  const handleKeyDown = (event) => {
    const textarea = event.target;

    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      textarea.style.height = "40px";
      handleSendMessage();
      return;
    }
    textarea.style.height = "40px";
    textarea.style.overflowY = "hidden";
    const scrollHeight = event.target.scrollHeight;
    if (scrollHeight > 50) textarea.style.height = scrollHeight + "px";
    if (scrollHeight > 150) textarea.style.overflowY = "scroll";
  };

  /**
   * 
   * Toggle the dropdown button on the top right
   * 
   */
  const toggleDropDown = (evt) => {
    if(!group) return;
    const dropdownMenu = evt.target.closest(".dropdown-button").querySelector(".dropdown-menu");
    if (dropdownMenu.getAttribute("dropdown-menu") === "true") dropdownMenu.setAttribute("dropdown-menu", "false");
    else dropdownMenu.setAttribute("dropdown-menu", "true");
  };

  /**
   * 
   * Toggle the responsive view
   * 
   */
  const handleResponsiveAside = () => dispatch(toggleAside(true));

  const { showProfile } = useProfile();

  const handleProfile = () => {
    if (conversation?.members?.length === 2) {
      const otherUser = conversation?.members?.find(
        (member) => member.id !== user.id
      );
      if (otherUser) showProfile(otherUser.id);
    }
  };

  const handleEdit = (e) => {
    const value = e.target.value;
    if (edition.active) setEdition({ ...edition, content: value });
    else setContent(value);
  };

  const insertEmoji = (e) => {
    const textarea = document.getElementsByTagName("textarea")[0];

    const { selectionStart, selectionEnd } = textarea;

    const start = content.substring(0, selectionStart);
    const end = content.substring(selectionEnd, content.length);

    const value = start + e.native + end;

    if (edition.active) setEdition({ ...edition, content: value });
    else setContent(value);
  };

  const openImages = (images) => {
    if (typeof images === "string") images = [images];
    dispatch(openSliceImages([...images]));
  };

  const addNewFile = async () => {
    if (reply) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg";
    input.multiple = true;
    input.onchange = (e) => {
      const inputFiles = e.target.files;
      if (inputFiles.length < 1) return;
      for (let i = 0; i < inputFiles.length; i++) {
        const file = inputFiles[i];
        let type = "";
        switch (file.type) {
          case "image/png":
          case "image/jpeg":
          case "image/jpg":
          default:
            type = "picture";
            break;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const result = { type, path: e.target.result, file };
          setFiles((prevFiles) => [...prevFiles, result]);
        };
      }
    };
    input.click();
  };

  const removeImage = (fileToDelette) => {
    const imgs = files.filter((file) => file !== fileToDelette);
    setFiles(imgs);
  };

  const handleMembers = () => openModal("Members", group)
  const addMember = () => openModal("AddMember", group)
  const editGroup = () => openModal("EditGroup", group)
  const leaveGroup = () => openModal("LeaveGroup", group)
  const removeGroup = () => openModal("RemoveGroup", group)

  const [isOnline, setIsOnline] = useState(false);

  // Get Online or Offline if the conversation is private
  useEffect(() => {
    if(!conversation) return;
    if(conversation.private) {
      const other = conversation.members.find(member => member.id !== user.id)

      socket.emit('join-is-online', other.id)

      socket.on(`is-online`, (data) => {
        if(data.id != other.id) return
        setIsOnline(data.status)
      })

      return () => {
        socket.emit('leave-is-online')
        socket.off(`is-online`)
      }
    }
  }, [conversation])

  return (
    <section id="chat">
      <header>
        <div className="left">
          <div className={`chat-profile-picture d-flex aic jcc ${!conversation && 'skeleton'}`}>
            <img src={conversation?.picture} alt={conversation?.name} />
          </div>
          <div className="right">
            {conversation ? (
              <>
                <span className="name">{conversation?.name}</span>
                <span className="status">
                  {!conversation?.private ? `${conversation?.members?.length} participant${conversation?.members?.length > 1 ? "s" : ""}` : isOnline ? t("global.online") : t("global.offline")}
                </span>
              </>
            ) : (
              <span className="skeleton">{t("global.loading")}</span>
            )}
          </div>
        </div>
        <div className="actions">
          <ButtonRounded size="small dropdown-button" onClick={toggleDropDown}>
            <FaEllipsisH />
            <div className="dropdown-menu" dropdown-menu="false">
              {conversation && (<>
                {conversation?.private  && <div className="dropdown-item p-2 mx-2" onClick={handleProfile}>
                  <span>{t("profile.see")}</span>
                </div>}
                {!conversation?.private  && <>
                  <div className="dropdown-item p-2 mx-2" onClick={handleMembers}>
                    <span>{t("profile.members")}</span>
                  </div>
                  {conversation.administrator.id === user.id &&<div className="dropdown-item p-2 mx-2" onClick={addMember}>
                    <span>{t("addMember.title")}</span>
                  </div>}
                  {conversation.administrator.id === user.id &&<div className="dropdown-item p-2 mx-2" onClick={editGroup}>
                    <span>{t("editGroup.title")}</span>
                  </div>}
                  {conversation.administrator.id !== user.id &&<div className="dropdown-item p-2 mx-2" onClick={leaveGroup}>
                    <span>{t("leaveGroup.title")}</span>
                  </div>}
                  {conversation.administrator.id === user.id && <div className="dropdown-item p-2 mx-2" onClick={removeGroup}>
                    <span>{t("removeGroup.title")}</span>
                  </div>}
                </>}
                </>)}
            </div>
          </ButtonRounded>
          <ButtonRounded size="small" additionalClasses="toggle-aside" onClick={handleResponsiveAside} >
            <FaXmark />
          </ButtonRounded>
        </div>
      </header>
      <main>
        <Messages conversation={conversation} messages={messages} />
      </main>
      <footer>
        {files.length > 0 && (
          <div className="files">
            {files.map((file, index) => {
              return (
                file.type === "picture" && (
                  <div key={index} className="input-file">
                    <img src={file.path} alt="Image to post" onClick={() => openImages(files)} />
                    <FaTimes className="close" onClick={() => removeImage(file)} />
                  </div>
                )
              );
            })}
          </div>
        )}
        {reply && (
          <div className="reply">
            <FaTimes className="close" onClick={() => setReply(null)} />
            <div className="sender">
              <span className="text-muted">{reply?.sender?.fullname}</span>
            </div>
            <p className="content">{reply?.content}</p>
          </div>
        )}
        <div className="writter">
          {false && (
            <ButtonRounded size="small" onClick={addNewFile}>
              <AiFillFileAdd />
            </ButtonRounded>
          )}
          {!edition?.active && !reply && (
            <ButtonRounded size="small" onClick={addNewFile}>
              <AiOutlinePicture />
            </ButtonRounded>
          )}

          <div className="textarea-container">
            <textarea id="textarea-writter" placeholder="Ecrivez votre message" onChange={handleEdit} value={edition.active ? edition.content : content} onKeyDown={handleKeyDown}></textarea>
            <div className="absolute">
              {limit > 200 && (
                <span>
                  <span
                    className={
                      limit >= 275 && limit < 300
                        ? "warning"
                        : limit >= 300
                        ? "danger"
                        : ""
                    }
                  >
                    {limit}
                  </span>
                  /300
                </span>
              )}
              {!isMobileView && <>
              <div className={`gif d-flex jcc aic`}>
                <PiGifFill onClick={() => {
                    toggleGif(!gif);
                  }} />
                {gif && (
                  <div className="writter-gif">
                    <GifPicker tenorApiKey={"AIzaSyAS4U-OrPPDpconx5A_-u6Xm-SwMhOGZ8g"} onGifClick={onGifClick} theme={theme} locale={`${language}_${language}`} />
                  </div>
                )}
              </div>
              <div className={`emoji d-flex jcc aic`}>
                <em-emoji shortcodes=":smile:" size="1.5rem" onClick={() => { toggleEmoji(!emoji) }}></em-emoji>
                {emoji && (
                  <div className="writter-emoji">
                    <Picker data={data} onEmojiSelect={insertEmoji} />
                  </div>
                )}
              </div>
              </>}
            </div>
          </div>

          {content.trim().length > 0 ||
          edition?.content?.trim().length > 0 ||
          files.length > 0 ? (
            <ButtonRounded size="small" onClick={handleSendMessage}>
              <IoIosSend style={{ height: 20, width: 20 }} />
            </ButtonRounded>
          ) : (
            <div className="clickable">
              <em-emoji onClick={(e) => { handleSendMessage(e, true); }} native={conversation?.emoji ?? "👍"} size="1.5rem"></em-emoji>
            </div>
          )}
        </div>
      </footer>
    </section>
  );
}
