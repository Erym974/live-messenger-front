import toast from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";

export default function useNotification() {
    
    const notificationMessage = (title = "Notification", content, actions, options) => {

        // if there is no id in options
        if(!options.hasOwnProperty('id')) {
            options.id = new Date().getTime()
        }

        toast.custom(<div className="notifications">
            <header>
                <h4>{title}</h4>
                <FaTimes onClick={() => { toast.dismiss(options.id) }} />
            </header>
            <main className="content">
                {content}
            </main>
            <footer className="footer">
                {actions}
            </footer>
        </div>, {
            ...options
        })

        return options.id

    }

    return { notificationMessage }

}