import { useDocumentTitle } from "@uidotdev/usehooks"
import toast, { Toaster } from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";

export default function useNotification() {

    const notificationTitle = () => {
    }
    
    const notificationMessage = (title = "Notification", content, actions = <></>, options) => {

        // get timestamp

        const time = new Date().getTime();

        toast.custom(<div className="notifications">
            <header>
                <h4>{title}</h4>
                <FaTimes onClick={() => { toast.dismiss(time) }} />
            </header>
            <main className="content">
                {content}
            </main>
            <footer className="footer">
                {actions}
            </footer>
        </div>, {
            id: time,
            ...options
        })
    }

    const notificationSound = () => {

    }

    return { notificationTitle, notificationMessage, notificationSound }

}