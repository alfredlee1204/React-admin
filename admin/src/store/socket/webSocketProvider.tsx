import { WebSocketStore } from "./webSocketStore";
import WebSocketContext from "./webSocketContext";
const WebSocketProvider = ({ children }: { children: JSX.Element }) => {
    const messageStore = new WebSocketStore()
    return <WebSocketContext.Provider value={messageStore}>
        {children}
    </WebSocketContext.Provider >
}

export default WebSocketProvider