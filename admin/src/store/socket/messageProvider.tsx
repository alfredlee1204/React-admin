import { MessageStore } from "./messageStore";
import SocketContext from "./messageContext";
const MessageProvider = ({ children }: { children: JSX.Element }) => {
    const messageStore = new MessageStore()
    return <SocketContext.Provider value={messageStore}>
        {children}
    </SocketContext.Provider >
}

export default MessageProvider